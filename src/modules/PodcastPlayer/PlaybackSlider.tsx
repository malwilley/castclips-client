import { css } from 'emotion';
import { PauseIcon, PlayArrowIcon } from 'mdi-react';
import Slider from 'rc-slider';
import * as React from 'react';
import Button from '~/components/Button';
import { Back5, Forward30 } from '~/icons';
import { colors } from '~/styles';
import { PlayStatus } from '~/types';
import formatHrMinSec from '~/utils/formatHrMinSec';
import './PlaybackSlider.css';

type PlaybackControlProps = {
  playStatus?: PlayStatus;
  handlePlayPauseClick?: () => void;
  handleForwardClick?: () => void;
  handleBackClick?: () => void;
};

type PlaybackSliderProps = PlaybackControlProps & {
  className?: string;
  disabled?: boolean;
  duration?: number;
  start?: number;
  time?: number;
  onSeek?: (time: number) => void;
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
      fill: colors.dark,
    },
    '&:disabled': {
      opacity: 0.3,
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

const formatTime = (timeSeconds: number, durationSeconds: number): string =>
  `${formatHrMinSec(timeSeconds)} / ${formatHrMinSec(durationSeconds)}`;

const Icon: React.SFC<{ active?: boolean; onClick?: () => void }> = ({
  active,
  children,
  onClick,
}) => (
  <Button active={active} className={styles.controlIcon} onClick={onClick}>
    {children}
  </Button>
);

const PlaybackSlider: React.SFC<PlaybackSliderProps> = ({
  className,
  disabled = false,
  duration = 0,
  handleBackClick,
  handleForwardClick,
  handlePlayPauseClick,
  start = 0,
  time = 0,
  onSeek,
  playStatus = PlayStatus.Paused,
}) => (
  <div className={css(styles.main, className)}>
    <Slider
      className="playback-slider"
      min={start}
      max={Math.round(duration)}
      value={Math.floor(time)}
      onChange={onSeek}
    />
    <div className={styles.controlsAndTimeContainer}>
      <div className={styles.controlsContainer}>
        {playStatus === PlayStatus.Paused ? (
          <Icon active={!disabled} onClick={handlePlayPauseClick}>
            <PlayArrowIcon />
          </Icon>
        ) : (
          <Icon active={!disabled} onClick={handlePlayPauseClick}>
            <PauseIcon />
          </Icon>
        )}
        <Icon active={!disabled} onClick={handleBackClick}>
          <Back5 />
        </Icon>
        <Icon active={!disabled} onClick={handleForwardClick}>
          <Forward30 />
        </Icon>
      </div>
      <div>{formatTime(time, duration)}</div>
    </div>
  </div>
);

export default PlaybackSlider;
