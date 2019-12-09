import * as React from 'react';
import { css } from 'emotion';
import { colors } from 'styles';

type RoundedCornersProps = {
  className?: string;
  top?: boolean;
  bottom?: boolean;
};

const styles = {
  border: css({
    height: 32,
    width: '100%',
    backgroundColor: colors.white,
  }),
  borderBottom: css({
    '@media (max-width: 800px)': {
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
    },
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    marginBottom: -30,
  }),
  borderTop: css({
    '@media (max-width: 800px)': {
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
    },
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    bottom: 0,
    marginTop: -30,
  }),
};

const RoundedCorners: React.FC<RoundedCornersProps> = ({ className, top, bottom }) => (
  <div
    className={css(
      styles.border,
      top && styles.borderTop,
      bottom && styles.borderBottom,
      className
    )}
  />
);

export default RoundedCorners;
