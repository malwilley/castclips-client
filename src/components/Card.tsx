import * as React from 'react';
import { css } from 'emotion';
import { colors } from '~/styles';

type CardProps = {
  className?: string;
};

const styles = {
  main: css({
    backgroundColor: colors.lightest,
    color: colors.dark,
    boxShadow: 'var(--card-dropshadow)',
    borderRadius: 8,
    overflow: 'hidden',
  }),
};

const Card: React.SFC<CardProps> = ({ children, className }) => (
  <div className={css(styles.main, className)}>{children}</div>
);

export default Card;
