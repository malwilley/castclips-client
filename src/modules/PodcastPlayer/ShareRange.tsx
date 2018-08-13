import { css } from 'emotion';
import { Range } from 'rc-slider';
import * as React from 'react';
import formatHrMinSec from '~/utils/formatHrMinSec';
import './ShareRange.css';

export type ShareRangeState = { start: number; end: number } | null;

type ShareRangeProps = {
  min: number;
  max: number;
  range: ShareRangeState;
  onChange: (start: number, end: number) => void;
  previewing: boolean;
  recording: boolean;
  time: number;
};

const styles = {
  labelContainer: css({
    display: 'flex',
    justifyContent: 'space-between',
  }),
};

const hiddenHandleStyles: React.CSSProperties[] = [0, 0].map(_ => ({
  visibility: 'hidden' as 'hidden',
}));

const makeHandleOnChange = ({ min, max, range, onChange }: ShareRangeProps) => (
  bounds: number[]
) => {
  const start = bounds[0];
  const end = bounds[1];
  if (start === end) {
    return;
  }

  // if range isn't yet made, set make range between cursor and midpoint of view
  if (!range) {
    const midpoint = (max - min) / 2;
    return onChange(
      bounds[1] < midpoint ? bounds[1] : midpoint,
      bounds[1] > midpoint ? bounds[1] : midpoint
    );
  }

  return onChange(start, end);
};

const ShareRange: React.SFC<ShareRangeProps> = props => {
  const { min, max, range } = props;
  return (
    <>
      <Range
        className="share-range"
        min={min}
        max={max}
        pushable={3}
        value={range ? [range.start, range.end] : [0, 0]}
        onChange={makeHandleOnChange(props)}
        handleStyle={range && range.start < max && range.end > min ? [] : hiddenHandleStyles}
      />
      <div className={styles.labelContainer}>
        <small>{formatHrMinSec(min)}</small>
        <small>{formatHrMinSec(max)}</small>
      </div>
    </>
  );
};

export default ShareRange;
