import { css } from 'emotion';
import { PauseIcon, PlayArrowIcon } from 'mdi-react';
import Slider from 'rc-slider';
import * as React from 'react';
import Button from '~/components/Button';
import { Back5, Forward30 } from '~/icons';
import { colors } from '~/styles';
import { PlayStatus } from '~/types';
import './PlaybackSlider.css';

type PlaybackControlProps = {
  playStatus: PlayStatus;
  handlePlayPauseClick: () => void;
  handleForwardClick: () => void;
  handleBackClick: () => void;
};

type PlaybackSliderProps = PlaybackControlProps & {
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
    padding: '0 16px',
  }),
  controlIcon: css({
    '& > svg': {
      height: 24,
      width: 24,
      fill: colors.darkest,
    },
    '&:disabled > svg': {
      fill: colors.dark,
    },
    marginRight: 10,
    padding: 8,
  }),
  controlsContainer: css({
    display: 'flex',
    marginLeft: -8,
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

const Icon: React.SFC<{ onClick: () => void }> = ({ children, onClick }) => (
  <Button className={styles.controlIcon} onClick={onClick}>
    {children}
  </Button>
);

const PlaybackSlider: React.SFC<PlaybackSliderProps> = ({
  className,
  duration,
  handleBackClick,
  handleForwardClick,
  handlePlayPauseClick,
  time,
  onSeek,
  playStatus,
}) => (
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
        {playStatus === PlayStatus.Paused ? (
          <Icon onClick={handlePlayPauseClick}>
            <PlayArrowIcon />
          </Icon>
        ) : (
          <Icon onClick={handlePlayPauseClick}>
            <PauseIcon />
          </Icon>
        )}
        <Icon onClick={handleBackClick}>
          <Back5 />
        </Icon>
        <Icon onClick={handleForwardClick}>
          <Forward30 />
        </Icon>
      </div>
      <div>{formatTime(time, duration)}</div>
    </div>
  </div>
);

export default PlaybackSlider;
