import React, { useCallback } from 'react';

export type AudioState = {
  time: number;
  duration: number;
  isPlaying: boolean;
  canPlay: boolean;
  setTime: (time: number) => void;
};

export type AudioControls = {
  play: () => void;
  pause: () => void;
  seek: (time: number) => void;
  seekRelative: (relativeTime: number) => void;
};

export type AudioControlsResult = { state: AudioState; controls: AudioControls };

// https://github.com/streamich/react-use/blob/master/util/createHTMLMediaHook.ts

const useAudioControls = (
  ref: React.RefObject<HTMLAudioElement>
): { state: AudioState; controls: AudioControls } => {
  const [time, setTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [canPlay, setCanPlay] = React.useState(false);

  const onTimeUpdate = React.useCallback(() => {
    if (ref.current) {
      setTime(ref.current.currentTime);
    }
  }, [ref]);

  const onDurationChange = React.useCallback(() => {
    if (ref.current) {
      setDuration(ref.current.duration);
    }
  }, [ref]);

  const onPlay = React.useCallback(() => {
    setIsPlaying(true);
  }, [setIsPlaying]);

  const onPause = React.useCallback(() => {
    setIsPlaying(false);
  }, [setIsPlaying]);

  const onCanPlay = React.useCallback(() => {
    setCanPlay(true);
  }, [setCanPlay]);

  React.useEffect(() => {
    if (!ref.current) {
      return;
    }

    ref.current.addEventListener('timeupdate', onTimeUpdate);
    ref.current.addEventListener('durationchange', onDurationChange);
    ref.current.addEventListener('canplay', onCanPlay);
    ref.current.addEventListener('play', onPlay);
    ref.current.addEventListener('pause', onPause);

    const refCopy = ref.current;

    return () => {
      if (!refCopy) {
        return;
      }

      refCopy.removeEventListener('timeupdate', onTimeUpdate);
      refCopy.removeEventListener('durationchange', onDurationChange);
      refCopy.removeEventListener('canplay', onCanPlay);
      refCopy.removeEventListener('play', onPlay);
      refCopy.removeEventListener('pause', onPause);
    };
  }, [ref, onTimeUpdate, onDurationChange, onPlay, onPause, onCanPlay]);

  const play = useCallback(() => {
    ref.current && ref.current.play();
  }, [ref]);
  const pause = useCallback(() => {
    ref.current && ref.current.pause();
  }, [ref]);
  const seek = useCallback(
    (time: number) => {
      const truncated = Math.min(duration, Math.max(0, time));
      setTime(truncated);
      ref.current && (ref.current.currentTime = truncated);
    },
    [duration, ref]
  );
  const seekRelative = useCallback(
    (relativeTime: number) => {
      seek(time + relativeTime);
    },
    [seek, time]
  );

  return {
    controls: {
      play,
      pause,
      seek,
      seekRelative,
    },
    state: {
      time,
      duration,
      isPlaying,
      canPlay,
      setTime,
    },
  };
};

export default useAudioControls;
