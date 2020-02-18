/// <reference types="Cypress" />
/// <reference types="@types/testing-library__cypress" />

declare namespace Cypress {
  interface Chainable {
    audio(): Chainable<HTMLAudioElement>
    seek(seconds: number): Chainable<HTMLAudioElement>
    seekToEnd(): Chainable<HTMLAudioElement>
  }

  interface Chainer<Subject> {
    (chainer: 'be.playing'): Chainable<Subject>
    (chainer: 'not.be.playing'): Chainable<Subject>
    (chainer: 'currentTime', seconds: number): Chainable<Subject>
  }
}
