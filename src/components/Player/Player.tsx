import React, { useRef } from 'react';
import { Slider, Rail, Handles, Tracks } from 'react-compound-slider';
import { css } from 'emotion';
import Audio from '../AudioNew';
import useAudioControls from 'src/hooks/useAudioControls';
import { colors, fonts } from 'src/styles';
import PlayerControls from './PlayerControls';
import formatHrMinSec from 'src/utils/formatHrMinSec';

type PlayerProps = {
  audioUrl: string;
  title: string;
};

const styles = {
  controlsContainer: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '6px 30px 10px 4px',
  }),
  timeLabel: css(fonts.text300, {}),
  slider: css({
    '&:hover': {
      backgroundColor: colors.gray50,
    },
    cursor: 'pointer',
    position: 'relative',
    width: '100%',
    height: 4,
    transition: 'background-color 300ms ease-out',
  }),
  handle: css({
    backgroundColor: colors.tertiary100,
    cursor: 'grab',
    position: 'absolute',
    height: 14,
    width: 14,
    borderRadius: 7,
    top: -4,
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
    borderRadius: 8,
    backgroundColor: colors.tertiary100,
    position: 'absolute',
    left: 0,
    top: 0,
    cursor: 'pointer',
    height: 4,
    width: '100%',
  }),
};

// create 'convert' function instead ot * 100 / 100
// forward/back doesn't update slider still

const Player: React.FC<PlayerProps> = ({ audioUrl, title }) => {
  const ref = React.useRef<HTMLAudioElement>(null);
  const {
    state: { canPlay, duration, isPlaying, setTime, time },
    controls,
  } = useAudioControls(ref);
  const values = useRef([time]);
  values.current[0] = Math.round(time * 100);
  console.log('time', time);
  console.log(values);

  return (
    <div>
      <Audio src={audioUrl} title={title} audioRef={ref} />
      <Slider
        className={styles.slider}
        domain={[0, Math.round(duration * 100)]}
        step={1}
        values={values.current}
        onChange={([value]) => {
          console.log('seeking', value / 100);
          controls.seek(value / 100);
        }}
        onUpdate={([value]) => {
          if (!value) {
            return;
          }
          console.log('value', value);
          setTime(value / 100);
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
      <div className={styles.controlsContainer}>
        <PlayerControls
          canPlay={canPlay}
          handleBackClick={() => controls.seek(time - 5)}
          handleForwardClick={() => controls.seek(time + 30)}
          handlePlayPauseClick={() => (isPlaying ? controls.pause() : controls.play())}
          isPlaying={isPlaying}
        />
        <div className={styles.timeLabel}>
          {formatHrMinSec(time)} / {formatHrMinSec(duration)}
        </div>
      </div>
    </div>
  );
};

export default Player;
