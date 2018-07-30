import { css } from 'emotion';
import Slider from 'rc-slider';
import * as React from 'react';
import './PlaybackSlider.css';

type PlaybackSliderProps = {
  className?: string;
  duration: number;
  time: number;
  onSeek: (time: number) => void;
};

const styles = {
  controlsAndTimeContainer: css({
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 8px',
  }),
  controlsContainer: css({
    display: 'flex',
  }),
  main: css({}),
};

const formatNumber = (num: number) => (num < 10 ? `0${num}` : num);

const formatHrMinSec = (seconds: number): string =>
  [Math.floor(seconds / 3600), Math.floor((seconds % 3600) / 60), Math.floor((seconds % 3600) % 60)]
    .map(formatNumber)
    .join(':');

const formatTime = (timeSeconds: number, durationSeconds: number): string =>
  `${formatHrMinSec(timeSeconds)} / ${formatHrMinSec(durationSeconds)}`;

const PlaybackSlider: React.SFC<PlaybackSliderProps> = ({ className, duration, time, onSeek }) => (
  <div className={css(styles.main, className)}>
    <Slider
      className="playback-slider"
      min={0}
      max={Math.round(duration)}
      value={time}
      onChange={onSeek}
    />
    <div className={styles.controlsAndTimeContainer}>
      <div className={styles.controlsContainer}>
        <p>play</p>
        <p>forward</p>
      </div>
      <div>{formatTime(time, duration)}</div>
    </div>
  </div>
);

export default PlaybackSlider;
