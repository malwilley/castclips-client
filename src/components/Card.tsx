import * as React from 'react';
import { css } from 'emotion';
import { colors, boxShadow, clickable } from 'src/styles';
import { Link } from 'react-router-dom';
import zIndex from 'src/styles/zIndex';

type CardProps = {
  className?: string;
  feature?: boolean;
  to?: string;
};

const styles = {
  main: css({
    backgroundColor: colors.white,
    color: colors.gray600,
    border: `1px solid ${colors.gray50}`,
    borderRadius: 8,
    overflow: 'hidden',
  }),
  mainHoverable: (feature: boolean) =>
    css(feature && clickable, {
      '&:hover': {
        border: feature ? 'none' : '1px solid transparent',
        boxShadow: feature ? boxShadow.cardHover : boxShadow.card,
        zIndex: zIndex.card,
      },
      position: 'relative',
      transition: 'all 300ms ease-out',
    }),
  feature: css({
    boxShadow: boxShadow.card,
    border: 'none',
  }),
  link: css({
    '&::after': {
      position: 'absolute',
      width: '100%',
      height: '100%',
      content: '""',
      zIndex: zIndex.card,
    },
  }),
};

const Card: React.SFC<CardProps> = ({ children, className, feature = false, to }) => (
  <div
    className={css(
      styles.main,
      feature && styles.feature,
      to && styles.mainHoverable(feature),
      className
    )}
  >
    {to && <Link className={styles.link} to={to} />}
    {children}
  </div>
);

export default Card;
