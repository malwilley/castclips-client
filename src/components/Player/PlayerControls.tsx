import React from 'react'
import { css } from 'emotion'
import Button from '../Button'
import Rewind10 from 'mdi-react/Rewind10Icon'
import FastForward30 from 'mdi-react/FastForward30Icon'
import PlayArrowIcon from 'mdi-react/PlayArrowIcon'
import PauseIcon from 'mdi-react/PauseIcon'
import { colors } from 'styles'
import Tooltip from '../Tooltip'
import AccessibleLabel from '../AccessibleLabel'
import noop from 'utils/noop'

type PlayerControlsProps = Partial<{
  className: string
  canPlay: boolean
  isPlaying: boolean
  handlePlayPauseClick: () => void
  handleForwardClick: () => void
  handleBackClick: () => void
}>

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
}

const PlayerControls: React.FC<PlayerControlsProps> = ({
  className,
  canPlay = false,
  handleBackClick = noop,
  handleForwardClick = noop,
  handlePlayPauseClick = noop,
  isPlaying = false,
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
)

export default PlayerControls
