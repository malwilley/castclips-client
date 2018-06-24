import * as React from 'react';
import { PlayMode } from '~/types';

type ShareToggleProps = { 
  mode: PlayMode,
  handleToggle: (newMode: PlayMode) => void
};

const toLabel = (mode: PlayMode) => {
  switch (mode) {
    case PlayMode.Share:
      return 'Share';
    case PlayMode.Playback:
    default:
      return 'Playback';
  }
};

const ShareToggle = ({ mode, handleToggle}: ShareToggleProps) => (
  <button
    className="p1 m1" 
    onClick={() => handleToggle(mode === PlayMode.Playback ? PlayMode.Share : PlayMode.Playback)}
  >
    {toLabel(mode)}
  </button>
);

export default ShareToggle;