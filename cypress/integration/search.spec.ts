describe('Search', () => {
  beforeEach(() => {
    cy.visit('/search?q=test')
  })

  it('searches podcasts by default', () => {
    cy.findByText(/podcasts matching/).should('exist')
    cy.url().should('include', 'type=podcast')
  })

  it('saves search type for future searches', () => {
    cy.findByText('Episodes').click()
    cy.findByText(/episodes matching/).should('exist')

    cy.visit('/search?q=test')
    cy.findByText(/episodes matching/).should('exist')
  })

  it('can search clips', () => {
    cy.findByText('Clips').click()
    cy.findByText(/clips matching/).should('exist')
  })

  it('can search using search bar', () => {
    cy.findByLabelText('Search')
      .clear()
      .type('new query')
    cy.findByText('Submit')
      .parent()
      .click()

    cy.findByText('new query').should('exist')
    cy.url().should('include', 'q=new%20query')
  })

  it('can navigate pages', () => {
    cy.findByText('Next').click()
    cy.url().should('include', '&page=2')
  })
})
