import React from 'react';
import { css } from 'emotion';
import { colors, boxShadow, clickable } from 'styles';
import zIndex from 'styles/zIndex';

type CardProps = {
  className?: string;
  feature?: boolean;
  hover?: boolean;
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
      transition: 'all 200ms ease-out',
    }),
  feature: css({
    boxShadow: boxShadow.card,
    border: 'none',
  }),
};

const Card: React.SFC<CardProps> = ({ children, className, feature = false, hover = false }) => (
  <div
    className={css(
      styles.main,
      feature && styles.feature,
      hover && styles.mainHoverable(feature),
      className
    )}
  >
    {children}
  </div>
);

export default Card;
