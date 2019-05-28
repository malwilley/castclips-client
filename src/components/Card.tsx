import * as React from 'react';
import { css } from 'emotion';
import { colors, boxShadow } from '~/styles';
import { Link } from 'react-router-dom';
import zIndex from '~/styles/zIndex';

type CardProps = {
  className?: string;
  feature?: boolean;
  to?: string;
};

const styles = {
  main: css({
    backgroundColor: colors.lightest,
    color: colors.gray600,
    boxShadow: boxShadow.normal2,
    borderRadius: 8,
    overflow: 'hidden',
  }),
  mainHoverable: css({
    '&:hover': {
      boxShadow: boxShadow.normalHover,
      zIndex: zIndex.card,
    },
    position: 'relative',
    transition: 'box-shadow 200ms ease-out',
  }),
  feature: css({
    boxShadow: boxShadow.prominent,
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
    className={css(styles.main, feature && styles.feature, to && styles.mainHoverable, className)}
  >
    {to && <Link className={styles.link} to={to} />}
    {children}
  </div>
);

export default Card;
