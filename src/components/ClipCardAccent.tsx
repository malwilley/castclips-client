import * as React from 'react';
import { css } from 'emotion';
import { colors } from '~/styles';

type ClipCardAccentProps = {
  end: number;
  length: number;
  start: number;
};

const styles = {
  accent: css({
    backgroundColor: colors.lightest,
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

const ClipCardAccent: React.FC<ClipCardAccentProps> = ({ end, length, start }) => (
  <div className={styles.accent}>
    <div
      className={styles.accentClipSection}
      style={{
        left: `${(start / length) * 100}%`,
        width: `${((end - start) / length) * 100}%`,
      }}
    />
  </div>
);

export default ClipCardAccent;
