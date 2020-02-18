const isPlaying = (_chai, utils) => {
  _chai.Assertion.addMethod('playing', function() {
    const audio = this._obj.get(0)

    this.assert(
      audio.duration && !audio.paused,
      'expected audio to be playing',
      'expected audio to not be playing',
      this._obj
    )
  })
}

const hasCurrentTime = (_chai, utils) => {
  _chai.Assertion.addMethod('currentTime', function(seconds) {
    const audio = this._obj.get(0)

    this.assert(
      audio.duration && audio.currentTime === seconds,
      `expected audio to be at ${seconds} seconds`,
      `expected audio to not be at ${seconds} seconds`,
      this._obj
    )
  })
}

chai.use(isPlaying).use(hasCurrentTime)
