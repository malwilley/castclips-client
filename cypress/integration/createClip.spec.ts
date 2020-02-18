describe('Create clip', () => {
  beforeEach(() => {
    cy.visit('/episode/247b631a0dff416bb3e755f4b25e1b62')
    cy.findByText('Create a clip').click()
  })

  it('can input timestamps by hand', () => {
    cy.findByPlaceholderText('Start time')
      .type('30:47')
      .blur()
      .should('have.value', '00:30:47')
    cy.findByPlaceholderText('End time')
      .type('1:01:01')
      .blur()
      .should('have.value', '01:01:01')
    cy.findByTestId('create-clip').should('not.be.disabled')
  })

  it('does not allow a clip to be created with no start time', () => {
    cy.findAllByText('Set current time')
      .last()
      .click()
    cy.findByTestId('create-clip').should('be.disabled')
  })

  it('does not allow a clip to be created with no end time', () => {
    cy.findAllByText('Set current time')
      .first()
      .click()
    cy.findByTestId('create-clip').should('be.disabled')
  })

  it('does not allow a clip to be created with end time before or equal to start time', () => {
    // start = end
    cy.findAllByText('Set current time')
      .first()
      .click()
    cy.findAllByText('Set current time')
      .last()
      .click()
    cy.findByTestId('create-clip').should('be.disabled')

    // start > end
    cy.findAllByText('+1')
      .first()
      .click()
    cy.findByTestId('create-clip').should('be.disabled')
  })

  describe('Clip modal', () => {
    beforeEach(() => {
      cy.findAllByText('Set current time')
        .first()
        .click()
      cy.findAllByText('+1')
        .last()
        .click()
        .click()
        .click()
      cy.findByText('Create').click()
    })

    it('can create a 3 second clip, edit, and delete it', () => {
      cy.findByLabelText('Clip title *')
        .click()
        .type('Test title')
      cy.findByLabelText('Clip description')
        .click()
        .type('Test description')
      cy.findByTestId('modal-create-clip').click()
      cy.url().should('include', '/clip')
      cy.findByText('Test title').should('exist')
      cy.findByText('Test description').should('exist')
      cy.findByText('00:00:03').should('exist')

      // Edit clip
      cy.findByText('Edit clip').click()
      cy.findByLabelText('Clip title *')
        .click()
        .clear()
        .type('New title')
      cy.findByLabelText('Clip description')
        .click()
        .clear()
        .type('New description')
      cy.findByTestId('edit-clip-modal-submit').click()
      cy.findByText('New title').should('exist')
      cy.findByText('New description').should('exist')

      // Delete clip
      cy.findByText('Delete clip').click()
      cy.findByTestId('delete-clip-modal-submit').click()
      cy.url().should('include', '/episode/247b631a0dff416bb3e755f4b25e1b62')
    })

    it('does not allow clip with invalid attributes', () => {
      // No title
      cy.findByTestId('modal-create-clip').should('be.disabled')

      // Title too long
      cy.findByLabelText('Clip title *')
        .click()
        .type(
          'jPheZKWAPWp92NRilw6u67HGSyQQ8qTHuYKd5ec2YIS5Psv05MIZySQByHsb0i6xkGPbgJetp9UT4tNxpWEdBbdE2kDkEhaQ01SvB4WSgzjolfizkcXgwOulfQXaEOUSOA4jvSrgUtHxOUhOtJ4Nwn5Be2PzUkURnRngJZsEvZig1plbiIyVJv8YF0jdirFrqNZGnSLkH'
        )
      cy.findByTestId('modal-create-clip').should('be.disabled')
      cy.findByLabelText('Clip title *')
        .click()
        .clear()

      // Description too long
      cy.findByLabelText('Clip title *')
        .click()
        .type('valid')
      cy.findByLabelText('Clip description')
        .click()
        .type(
          '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',
          { delay: 0 }
        )
      cy.findByTestId('modal-create-clip').should('be.disabled')
    })
  })
})
