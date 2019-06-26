import React from 'react';
import { css } from 'emotion';
import Button from '../Button';
import { PlayArrowIcon, PauseIcon } from 'mdi-react';
import { Forward30, Back5 } from 'src/icons';
import { colors } from 'src/styles';

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
      height: 24,
      width: 24,
    },
    '&:enabled:hover': {
      backgroundColor: colors.gray20,
    },
    '&:disabled': {
      opacity: 0.3,
    },
    padding: 12,
    borderRadius: '50%',
    transition: 'all 200ms ease-out',
  }),
  controlsContainer: css({
    '&:not(:last-child)': {
      marginRight: 4,
    },
    color: colors.gray700,
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
        <Button className={styles.controlIcon} active={canPlay} onClick={handlePlayPauseClick}>
          <PauseIcon />
        </Button>
      ) : (
        <Button className={styles.controlIcon} active={canPlay} onClick={handlePlayPauseClick}>
          <PlayArrowIcon />
        </Button>
      )}
      <Button className={styles.controlIcon} active={canPlay} onClick={handleBackClick}>
        <Back5 />
      </Button>
      <Button className={styles.controlIcon} active={canPlay} onClick={handleForwardClick}>
        <Forward30 />
      </Button>
    </div>
  </div>
);

export default PlayerControls;
