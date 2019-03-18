import * as React from 'react';
import { css } from 'emotion';
import { colors } from '~/styles';

type CardProps = {
  className?: string;
  feature?: boolean;
};

const styles = {
  main: css({
    backgroundColor: colors.lightest,
    color: colors.dark,
    boxShadow: 'var(--card-dropshadow)',
    borderRadius: 8,
    overflow: 'hidden',
  }),
  feature: css({
    boxShadow: 'var(--card-dropshadow-feature)',
  }),
};

const Card: React.SFC<CardProps> = ({ children, className, feature = false }) => (
  <div className={css(styles.main, feature && styles.feature, className)}>{children}</div>
);

export default Card;
