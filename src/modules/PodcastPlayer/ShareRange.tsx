import * as React from 'react';
import { Range } from 'rc-slider';
import './ShareRange.css';

type ShareRangeProps = {
  min: number;
  max: number;
  start: number;
  end: number;
  onSeek: (lower: number, upper: number) => void;
};

const ShareRange = ({ min, max, start, end, onSeek }: ShareRangeProps) => (
  <Range
    className="share-range"
    min={Math.round(min)}
    max={Math.round(max)}
    pushable={1}
    value={[Math.round(start), Math.round(end)]}
    onChange={(bounds: number[]) => onSeek(bounds[0], bounds[1])}
  />
);

export default ShareRange;
