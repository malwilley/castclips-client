import { css } from 'emotion';
import * as React from 'react';
import { Back5, Forward30, Pause, Play } from '~/icons';
import { PlayStatus } from '~/types/index';
import './PlaybackControls.css';

type PlaybackControlsProps = {
  playStatus: PlayStatus;
  handlePlayPauseClick: () => void;
  handleForwardClick: () => void;
  handleBackClick: () => void;
};

const styles = {
  icon: css({
    cursor: 'pointer',
    width: '4em',
    height: '4em',
  }),
  playIcon: css({
    '&:disabled': {
      fill: 'var(--color-gray)',
    },
    fill: 'var(--color-secondary)',
    filter: 'var(--svg-dropshadow)',
    margin: '0 2em',
  }),
  seekIcon: css({
    '&:disabled': {
      fill: 'var(--color-gray)',
    },
    padding: '0.75em',
    fill: 'var(--color-dark)',
  }),
};

const renderPlayPause = (
  playStatus: PlaybackControlsProps['playStatus'],
  handlePlayPauseClick: PlaybackControlsProps['handlePlayPauseClick']
) => {
  return playStatus === PlayStatus.Playing ? (
    <Pause className={css(styles.icon, styles.playIcon)} onClick={() => handlePlayPauseClick()} />
  ) : (
    <Play className={css(styles.icon, styles.playIcon)} onClick={() => handlePlayPauseClick()} />
  );
};

const PlaybackControls = ({
  playStatus,
  handleBackClick,
  handleForwardClick,
  handlePlayPauseClick,
}: PlaybackControlsProps) => (
  <div className="flex justify-center items-center">
    <Back5 className={css(styles.icon, styles.seekIcon)} onClick={handleBackClick} />
    {renderPlayPause(playStatus, handlePlayPauseClick)}
    <Forward30 className={css(styles.icon, styles.seekIcon)} onClick={handleForwardClick} />
  </div>
);

export default PlaybackControls;
