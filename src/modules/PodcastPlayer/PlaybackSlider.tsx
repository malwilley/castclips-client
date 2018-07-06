import Slider from 'rc-slider';
import * as React from 'react';
import './PlaybackSlider.css';

type PlaybackSliderProps = {
  duration: number;
  time: number;
  onSeek: (time: number) => void;
};

const PlaybackSlider = ({ duration, time, onSeek }: PlaybackSliderProps) => (
  <Slider
    className="playback-slider"
    min={0}
    max={Math.round(duration)}
    value={time}
    onChange={onSeek}
  />
);

export default PlaybackSlider;
