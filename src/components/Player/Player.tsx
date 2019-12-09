import React, { useState, useEffect, useCallback } from 'react';
import { Slider, Rail, Handles, Tracks } from 'react-compound-slider';
import { css } from 'emotion';
import Audio from '../Audio';
import { AudioControlsResult } from 'hooks/useAudioControls';
import { colors, fonts, breakpoints } from 'styles';
import PlayerControls from './PlayerControls';
import formatHrMinSec from 'utils/formatHrMinSec';
import { includes, pathOr } from 'ramda';
import { KeyCode } from 'types';
import AccessibleLabel from '../AccessibleLabel';

type PlayerProps = AudioControlsResult & {
  audioRef: React.RefObject<HTMLAudioElement>;
  audioUrl: string;
  title: string;
  start?: number;
  end?: number;
  captureKeyboardInput?: boolean;
};

const styles = {
  controlsContainer: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 30px 10px 4px',
  }),
  timeLabel: css(fonts.text250, breakpoints.breakpoint600(fonts.text300), {
    color: colors.gray700,
  }),
  slider: css({
    '&:hover': {
      backgroundColor: colors.gray50,
    },
    cursor: 'pointer',
    position: 'absolute',
    left: 2,
    right: 2,
    height: 4,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    transition: 'background-color 300ms ease-out',
  }),
  handle: css({
    '&:active::after': {
      position: 'absolute',
      left: -10,
      top: -10,
      height: 34,
      width: 34,
      backgroundColor: colors.tertiary100alpha30,
      borderRadius: '50%',
      content: '""',
    },
    backgroundColor: colors.tertiary100,
    cursor: 'grab',
    position: 'absolute',
    height: 14,
    width: 14,
    borderRadius: 7,
    top: -5,
    transform: 'translateX(-8px)',
  }),
  rail: css({
    position: 'absolute',
    height: 4,
    left: 0,
    top: 0,
    width: '100%',
  }),
  track: css({
    backgroundColor: colors.tertiary100,
    borderTopLeftRadius: 4,
    position: 'absolute',
    left: 0,
    top: 0,
    cursor: 'pointer',
    height: 4,
    width: '100%',
  }),
};

const toSliderValue = (seconds: number) => Math.round(seconds * 100);
const toSeconds = (value: number) => value / 100;

const Player: React.FC<PlayerProps> = ({
  audioRef,
  audioUrl,
  captureKeyboardInput = true,
  title,
  start = 0,
  end,
  state,
  controls,
}) => {
  const { canPlay, duration, isPlaying, setTime, time } = state;
  const [isSeeking, setIsSeeking] = useState<{ isPlaying: boolean } | null>(null);
  const togglePlayback = useCallback(() => {
    if (!isPlaying && canPlay) {
      controls.play();
    } else {
      controls.pause();
    }
  }, [isPlaying, canPlay, controls]);

  useEffect(() => {
    if (time >= (end || duration)) {
      controls.pause();
    }
  }, [time, end, duration, controls]);

  useEffect(() => {
    const handleKeyboardControls = (e: KeyboardEvent) => {
      if (
        includes(pathOr('', ['target', 'nodeName'], e).toLowerCase(), [
          'input',
          'textarea',
          'select',
          'button',
        ]) ||
        !captureKeyboardInput
      ) {
        return;
      }

      switch (e.keyCode) {
        case KeyCode.Space:
          e.preventDefault();
          togglePlayback();
          return;
        case KeyCode.ArrowLeft:
          e.preventDefault();
          canPlay && controls.seekRelative(-5);
          return;
        case KeyCode.ArrowRight:
          e.preventDefault();
          canPlay && controls.seekRelative(5);
          return;
      }
    };

    window.addEventListener('keydown', handleKeyboardControls);

    return () => {
      window.removeEventListener('keydown', handleKeyboardControls);
    };
  }, [canPlay, captureKeyboardInput, togglePlayback, controls.seekRelative, controls]);

  return (
    <div>
      <AccessibleLabel id="slider-label">Audio seek slider</AccessibleLabel>
      <Audio src={audioUrl} title={title} audioRef={audioRef} />
      {canPlay && (
        <Slider
          className={styles.slider}
          domain={[toSliderValue(start), toSliderValue(end || duration)]}
          step={1}
          values={[toSliderValue(time)]}
          onChange={([value]) => {
            controls.seek(toSeconds(value));
            if (isSeeking && isSeeking.isPlaying) {
              controls.play();
            }
            setIsSeeking(null);
          }}
          onUpdate={([value]) => {
            setTime(toSeconds(value));
          }}
          onSlideStart={() => {
            setIsSeeking({ isPlaying });
            controls.pause();
          }}
        >
          <Rail>{({ getRailProps }) => <div className={styles.rail} {...getRailProps()} />}</Rail>
          <Tracks right={false}>
            {({ tracks, getTrackProps }) => (
              <div>
                {tracks.map(({ id, target }) => (
                  <div
                    key={id}
                    className={styles.track}
                    style={{ width: `${target.percent}%` }}
                    {...getTrackProps()}
                  />
                ))}
              </div>
            )}
          </Tracks>
          <Handles>
            {({ handles, getHandleProps }) => (
              <div>
                {handles.map(({ id, percent }) => (
                  <div
                    aria-labelledby="slider-label"
                    aria-valuemin={start}
                    aria-valuemax={end || duration}
                    aria-valuenow={time}
                    aria-valuetext={`${formatHrMinSec(time - start)} of ${formatHrMinSec(
                      (end || duration) - start
                    )}`}
                    className={styles.handle}
                    key={id}
                    role="slider"
                    style={{ left: `${percent}%` }}
                    {...getHandleProps(id)}
                  />
                ))}
              </div>
            )}
          </Handles>
        </Slider>
      )}
      <div className={styles.controlsContainer}>
        <PlayerControls
          canPlay={canPlay}
          handleBackClick={() => controls.seek(time - 10)}
          handleForwardClick={() => controls.seek(time + 30)}
          handlePlayPauseClick={togglePlayback}
          isPlaying={isPlaying}
        />
        <div className={styles.timeLabel}>
          {formatHrMinSec(time - start)} / {formatHrMinSec((end || duration) - start)}
        </div>
      </div>
    </div>
  );
};

export default Player;
