import '@testing-library/cypress/add-commands'

Cypress.Commands.add('audio', () => cy.get('audio').first())

Cypress.Commands.add('seek', { prevSubject: 'element' }, (subject, seconds) =>
  cy
    .wrap(subject)
    .should(el => {
      expect(el.get(0).duration > 0)
    })
    .then(el => {
      const audio = el.get(0)
      audio.currentTime = seconds
    })
)

Cypress.Commands.add('seekToEnd', { prevSubject: 'element' }, subject =>
  cy
    .wrap(subject)
    .should(el => {
      expect(el.get(0).duration > 0)
    })
    .then(el => {
      const audio = el.get(0)
      audio.currentTime = audio.duration
    })
)
