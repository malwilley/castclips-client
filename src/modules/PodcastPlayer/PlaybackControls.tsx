import * as React from 'react';
import { PlayStatus } from '~/types/index';
import { Back5, Forward30, Play, Pause } from '~/icons';
import './PlaybackControls.css';

type PlaybackControlsProps = {
  playStatus: PlayStatus,
  handlePlayPauseClick: () => void,
  handleForwardClick: () => void,
  handleBackClick: () => void,
};

const renderPlayPause = (
  playStatus: PlaybackControlsProps['playStatus'], 
  handlePlayPauseClick: PlaybackControlsProps['handlePlayPauseClick']
) => {
  return playStatus === PlayStatus.Playing 
    ? <Pause className="play-icon mx2 clickable" onClick={() => handlePlayPauseClick()} />
    : <Play className="play-icon mx2 clickable" onClick={() => handlePlayPauseClick()} />;
};

const PlaybackControls = (
  { 
    playStatus, handleBackClick, handleForwardClick, handlePlayPauseClick 
  }: PlaybackControlsProps
) => (
  <div className="flex justify-center items-center">
    <Back5 className="seek-icon clickable"  onClick={handleBackClick} />
      {renderPlayPause(playStatus, handlePlayPauseClick)}
    <Forward30 className="seek-icon clickable" onClick={handleForwardClick} />
  </div>
);

export default PlaybackControls;