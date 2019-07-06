import React from 'react';
import { css } from 'emotion';
import Button from '../Button';
import { PlayArrowIcon, PauseIcon } from 'mdi-react';
import { Forward30, Back5 } from 'src/icons';
import { colors } from 'src/styles';
import Tooltip from '../Tooltip';

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
    '& > :not(:last-child)': {
      marginRight: 4,
    },
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
          <Button className={styles.controlIcon} active={canPlay} onClick={handlePlayPauseClick}>
            <PauseIcon />
          </Button>
        </Tooltip>
      ) : (
        <Tooltip bottom text="Play">
          <Button className={styles.controlIcon} active={canPlay} onClick={handlePlayPauseClick}>
            <PlayArrowIcon />
          </Button>
        </Tooltip>
      )}
      <Tooltip bottom text="Back 5s">
        <Button className={styles.controlIcon} active={canPlay} onClick={handleBackClick}>
          <Back5 />
        </Button>
      </Tooltip>
      <Tooltip bottom text="Forward 30s">
        <Button className={styles.controlIcon} active={canPlay} onClick={handleForwardClick}>
          <Forward30 />
        </Button>
      </Tooltip>
    </div>
  </div>
);

export default PlayerControls;
