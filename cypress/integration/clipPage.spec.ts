// Skipping until issues from https://github.com/cypress-io/cypress/issues/5015 can be fixed

describe.skip('clipPage', () => {
  beforeEach(() => {
    cy.visit('/clip/JWwEwyxbaOuw0uJdYF5g')
  })

  it('can play audio', () => {
    cy.audio().should('not.be.playing')
    cy.findByLabelText('Play').click()
    cy.audio().should('be.playing')
  })

  it('shows `continue listening` at end of clip', () => {
    cy.audio().seek(3)
    cy.findByText('Continue listening!').click()
  })

  it('sets correct time when clicking "Jump to full episode"', () => {
    cy.audio().seek(2)
    cy.findByText('00:00:02 / 00:00:03')
    cy.findByText('Jump to full episode').click()
    cy.url().should('include', '?time=2')
    cy.findByText(/00:00:02/)
    cy.audio().should('currentTime', 2)
  })

  it('has an episode timestamp that links to the start of the clip', () => {
    cy.findByText('00:00:00').click()
    cy.url().should('include', '?time=0')
    cy.findByText(/00:00:00/)
    cy.audio().should('currentTime', 0)
  })

  it('has an episode timestamp that links to the end of the clip', () => {
    cy.findByText('00:00:03').click()
    cy.url().should('include', '?time=3')
    cy.findByText(/00:00:03/)
    cy.audio().should('currentTime', 3)
  })
})
