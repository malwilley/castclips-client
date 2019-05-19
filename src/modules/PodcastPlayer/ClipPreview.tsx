import * as React from 'react';
import { css } from 'emotion';
import { colors } from '~/styles';

type ClipPreviewProps = {
  time: number;
  length: number;
  start: Maybe<number>;
  end: Maybe<number>;
};

const styles = {
  completedClip: css({
    backgroundColor: colors.secondary,
    position: 'absolute',
    top: 0,
    bottom: 0,
  }),
  main: css({
    backgroundColor: colors.gray20,
    height: 50,
    width: '100%',
    margin: '40px 0',
    position: 'relative',
  }),
  startEndNeedle: css({
    backgroundColor: colors.gray200,
    width: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
  }),
  timeNeedle: css({
    backgroundColor: colors.tertiary,
    width: 1,
    position: 'absolute',
    top: -10,
    bottom: -10,
  }),
};

const ClipPreview: React.FC<ClipPreviewProps> = ({ end, length, start, time }) => (
  <div className={styles.main}>
    {start && (
      <div className={styles.startEndNeedle} style={{ left: `${(start / length) * 100}%` }} />
    )}
    {end && <div className={styles.startEndNeedle} style={{ left: `${(end / length) * 100}%` }} />}
    {start && end && (
      <div
        className={styles.completedClip}
        style={{ left: `${(start / length) * 100}%`, right: `${(1 - end / length) * 100}%` }}
      />
    )}
    <div className={styles.timeNeedle} style={{ left: `${(time / length) * 100}%` }} />
  </div>
);

export default ClipPreview;
