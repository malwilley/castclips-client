import * as React from 'react';
import { css } from 'emotion';
import { colors } from 'src/styles';

type ClipCardAccentProps = {
  end: number;
  length: number;
  start: number;
};

const styles = {
  accent: css({
    backgroundColor: colors.white,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
  }),
  accentClipSection: css({
    backgroundColor: colors.tertiary,
    position: 'absolute',
    height: '100%',
    borderRadius: 2,
  }),
};

const ClipCardAccent: React.FC<ClipCardAccentProps> = ({ end, length, start }) => {
  const left = (start / length) * 100;
  const calculatedWidth = ((end - start) / length) * 100;
  const width = Math.max(calculatedWidth, Math.min(1, 100 - left));

  return (
    <div className={styles.accent}>
      <div
        className={styles.accentClipSection}
        style={{
          left: `${left}%`,
          width: `${width}%`,
        }}
      />
    </div>
  );
};

export default ClipCardAccent;
