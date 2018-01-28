import React from 'react';
import { isNil } from 'ramda';

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
};

export type AudioControlsResult = { state: AudioState; controls: AudioControls };

// https://github.com/streamich/react-use/blob/master/src/util/createHTMLMediaHook.ts

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
  }, [setTime]);

  const onDurationChange = React.useCallback(() => {
    if (ref.current) {
      setDuration(ref.current.duration);
    }
  }, [setDuration]);

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

    return () => {
      if (!ref.current) {
        return;
      }

      ref.current.removeEventListener('timeupdate', onTimeUpdate);
      ref.current.removeEventListener('durationchange', onDurationChange);
      ref.current.removeEventListener('canplay', onCanPlay);
      ref.current.removeEventListener('play', onPlay);
      ref.current.removeEventListener('pause', onPause);
    };
  }, [ref, onTimeUpdate, onDurationChange, onPlay, onPause]);

  const controls: AudioControls = {
    play: () => {
      ref.current && ref.current.play();
    },
    pause: () => {
      ref.current && ref.current.pause();
    },
    seek: (time: number) => {
      const truncated = Math.min(duration, Math.max(0, time));
      setTime(truncated);
      ref.current && (ref.current.currentTime = truncated);
    },
  };

  return {
    controls,
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
