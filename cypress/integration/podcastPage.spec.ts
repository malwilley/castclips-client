describe('clipPage', () => {
  beforeEach(() => {
    cy.visit('/podcast/a8ac2a1ff3d94e4c9ee28186e398288d')
  })

  it('can search podcast episodes', () => {
    cy.findByPlaceholderText('Search episodes...').click().type('2015{enter}')
    cy.findByText('Til Death Do Us Blart 2015').should('exist')
    cy.queryByText('Til Death Do Us Blart 2016').should('not.exist')
    cy.findByText('Clear').click()
    cy.findByText('Til Death Do Us Blart 2016').should('exist')
  })
})
