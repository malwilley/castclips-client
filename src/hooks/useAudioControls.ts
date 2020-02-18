import { useEffect, useCallback, useState, useRef, RefObject } from 'react'

export type AudioState = {
  buffered: Array<{ start: number; end: number }>
  time: number
  duration: number
  isPlaying: boolean
  canPlay: boolean
  setTime: (time: number) => void
}

export type AudioControls = {
  play: () => void
  pause: () => void
  seek: (time: number) => void
  seekRelative: (relativeTime: number) => void
}

export type AudioControlsResult = {
  ref: RefObject<HTMLAudioElement>
  state: AudioState
  controls: AudioControls
}

export type UseAudioControlsParams = {
  initialTime?: number
}

// https://github.com/streamich/react-use/blob/master/src/util/createHTMLMediaHook.ts

const useAudioControls = ({ initialTime }: UseAudioControlsParams = {}): AudioControlsResult => {
  const ref = useRef<HTMLAudioElement>(null)
  const [buffered, setBuffered] = useState([])
  const [time, setTime] = useState(initialTime || 0)
  const [duration, setDuration] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [canPlay, setCanPlay] = useState(false)

  const onTimeUpdate = useCallback(() => {
    if (ref.current) {
      setTime(ref.current.currentTime)
    }
  }, [ref])

  const onDurationChange = useCallback(() => {
    if (ref.current) {
      setDuration(ref.current.duration)
    }
  }, [ref])

  const onPlay = useCallback(() => {
    setIsPlaying(true)
  }, [setIsPlaying])

  const onPause = useCallback(() => {
    setIsPlaying(false)
  }, [setIsPlaying])

  const onCanPlay = useCallback(() => {
    setCanPlay(true)
  }, [setCanPlay])

  const onProgress = useCallback(() => {
    if (ref.current) {
      const elBuffered = ref.current.buffered
      setBuffered(
        Array(elBuffered.length)
          .fill(0)
          .reduce(
            (acc, _, i) => [...acc, { start: elBuffered.start(i), end: elBuffered.end(i) }],
            []
          )
      )
    }
  }, [setBuffered, ref])

  useEffect(() => {
    if (!ref.current) {
      return
    }

    ref.current.addEventListener('timeupdate', onTimeUpdate)
    ref.current.addEventListener('durationchange', onDurationChange)
    ref.current.addEventListener('loadedmetadata', onCanPlay)
    ref.current.addEventListener('play', onPlay)
    ref.current.addEventListener('pause', onPause)
    ref.current.addEventListener('progress', onProgress)

    // Need `autoPlay` on to support iOS, so pause the audio
    ref.current.pause()

    const refCopy = ref.current

    return () => {
      if (!refCopy) {
        return
      }

      refCopy.removeEventListener('timeupdate', onTimeUpdate)
      refCopy.removeEventListener('durationchange', onDurationChange)
      refCopy.removeEventListener('loadedmetadata', onCanPlay)
      refCopy.removeEventListener('play', onPlay)
      refCopy.removeEventListener('pause', onPause)
      refCopy.removeEventListener('progress', onProgress)
    }
  }, [ref, onTimeUpdate, onDurationChange, onPlay, onPause, onCanPlay, onProgress, initialTime])

  const play = useCallback(() => {
    ref.current && ref.current.play()
  }, [ref])
  const pause = useCallback(() => {
    ref.current && ref.current.pause()
  }, [ref])
  const seek = useCallback(
    (time: number) => {
      const truncated = Math.min(duration, Math.max(0, time))
      setTime(truncated)
      ref.current && (ref.current.currentTime = truncated)
    },
    [duration, ref]
  )
  const seekRelative = useCallback(
    (relativeTime: number) => {
      seek(time + relativeTime)
    },
    [seek, time]
  )

  return {
    ref,
    controls: {
      play,
      pause,
      seek,
      seekRelative,
    },
    state: {
      buffered,
      time,
      duration,
      isPlaying,
      canPlay,
      setTime,
    },
  }
}

export default useAudioControls
