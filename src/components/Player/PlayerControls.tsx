import React from 'react';
import { css } from 'emotion';
import Button from '../Button';
import { Rewind10, FastForward30, PlayArrowIcon, PauseIcon } from 'mdi-react';
import { Forward30, Back5 } from 'src/icons';
import { colors } from 'src/styles';
import Tooltip from '../Tooltip';
import AccessibleLabel from '../AccessibleLabel';

type PlayerControlsProps = {
  className?: string;
  canPlay: boolean;
  isPlaying: boolean;
  handlePlayPauseClick?: () => void;
  handleForwardClick?: () => void;
  handleBackClick?: () => void;
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
      fill: 'currentColor',
      height: 24,
      width: 24,
    },
    '&:enabled:hover': {
      backgroundColor: colors.gray20,
    },
    '&:disabled': {
      opacity: 0.3,
    },
    color: colors.gray700,
    padding: 12,
    borderRadius: '50%',
    transition: 'all 200ms ease-out',
  }),
  controlsContainer: css({
    display: 'flex',
    marginLeft: -8,
  }),
  main: css({}),
};

const PlayerControls: React.FC<PlayerControlsProps> = ({
  className,
  canPlay,
  handleBackClick,
  handleForwardClick,
  handlePlayPauseClick,
  isPlaying,
}) => (
  <div className={css(styles.controlsAndTimeContainer, className)}>
    <div className={styles.controlsContainer}>
      {isPlaying ? (
        <Tooltip bottom text="Pause">
          <Button
            aria-labelledby="pause-label"
            className={styles.controlIcon}
            active={canPlay}
            onClick={handlePlayPauseClick}
          >
            <AccessibleLabel id="pause-label">Pause</AccessibleLabel>
            <PauseIcon />
          </Button>
        </Tooltip>
      ) : (
        <Tooltip bottom text="Play">
          <Button
            aria-labelledby="play-label"
            className={styles.controlIcon}
            active={canPlay}
            onClick={handlePlayPauseClick}
          >
            <AccessibleLabel id="play-label">Play</AccessibleLabel>
            <PlayArrowIcon />
          </Button>
        </Tooltip>
      )}
      <Tooltip bottom text="Rewind 10s">
        <Button
          aria-labelledby="back10-label"
          className={styles.controlIcon}
          active={canPlay}
          onClick={handleBackClick}
        >
          <AccessibleLabel id="back10-label">Rewind 10 seconds</AccessibleLabel>
          <Rewind10 />
        </Button>
      </Tooltip>
      <Tooltip bottom text="Forward 30s">
        <Button
          aria-labelledby="forward-label"
          className={styles.controlIcon}
          active={canPlay}
          onClick={handleForwardClick}
        >
          <AccessibleLabel id="forward-label">Fast-forward 30 seconds</AccessibleLabel>
          <FastForward30 />
        </Button>
      </Tooltip>
    </div>
  </div>
);

export default PlayerControls;
