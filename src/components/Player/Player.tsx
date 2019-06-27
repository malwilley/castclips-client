import React, { useRef, useState, useEffect } from 'react';
import { Slider, Rail, Handles, Tracks } from 'react-compound-slider';
import { css } from 'emotion';
import Audio from '../Audio';
import useAudioControls, { AudioControlsResult } from 'src/hooks/useAudioControls';
import { colors, fonts } from 'src/styles';
import PlayerControls from './PlayerControls';
import formatHrMinSec from 'src/utils/formatHrMinSec';

type PlayerProps = AudioControlsResult & {
  audioRef: React.RefObject<HTMLAudioElement>;
  audioUrl: string;
  title: string;
  start?: number;
  end?: number;
};

const styles = {
  controlsContainer: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 30px 10px 4px',
  }),
  timeLabel: css(fonts.text300, {
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
    backgroundColor: colors.tertiary100,
    cursor: 'grab',
    position: 'absolute',
    height: 14,
    width: 14,
    borderRadius: 7,
    top: -5,
    transform: 'translateX(-7px)',
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
  title,
  start = 0,
  end,
  state,
  controls,
}) => {
  const { canPlay, duration, isPlaying, setTime, time } = state;
  const [isSeeking, setIsSeeking] = useState<{ isPlaying: boolean } | null>(null);
  useEffect(() => {
    if (time >= (end || duration)) {
      controls.pause();
    }
  }, [time, end, duration]);

  return (
    <div>
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
                {tracks.map(({ id, source, target }) => (
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
                    className={styles.handle}
                    key={id}
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
          handleBackClick={() => controls.seek(time - 5)}
          handleForwardClick={() => controls.seek(time + 30)}
          handlePlayPauseClick={() => (isPlaying ? controls.pause() : controls.play())}
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
