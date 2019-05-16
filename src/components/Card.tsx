import * as React from 'react';
import { css } from 'emotion';
import { colors } from '~/styles';
import { Link } from 'react-router-dom';

type CardProps = {
  className?: string;
  feature?: boolean;
  to?: string;
};

const styles = {
  main: css({
    backgroundColor: colors.lightest,
    border: `1px solid ${colors.gray300}`,
    color: colors.dark,
    boxShadow: 'var(--card-dropshadow)',
    borderRadius: 8,
    overflow: 'hidden',
  }),
  mainHoverable: css({
    '&:hover': {
      boxShadow: 'var(--card-dropshadow-feature)',
    },
    position: 'relative',
    transition: 'box-shadow 300ms ease-out',
  }),
  feature: css({
    boxShadow: 'var(--card-dropshadow-feature)',
    border: 'none',
  }),
  link: css({
    '&::after': {
      position: 'absolute',
      width: '100%',
      height: '100%',
      content: '""',
    },
  }),
};

const Card: React.SFC<CardProps> = ({ children, className, feature = false, to }) => (
  <div
    className={css(styles.main, feature && styles.feature, to && styles.mainHoverable, className)}
  >
    {to && <Link className={styles.link} to={to} />}
    {children}
  </div>
);

export default Card;
