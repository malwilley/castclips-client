import * as React from 'react';
import { css, keyframes } from 'emotion';
import { colors, fonts } from 'src/styles';

const fadeIn = keyframes({
  from: {
    opacity: 0,
    transform: 'translateY(10px) scale(0.6)',
  },
  to: {
    opacity: 1,
    transform: 'translateY(0) scale(1)',
  },
});

const styles = {
  main: css({
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    top: -40,
    animation: `${fadeIn} 200ms ease-out`,
  }),
  container: css(fonts.text300, {
    backgroundColor: colors.gray700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    color: colors.white,
    borderRadius: 4,
    padding: '1em',
    textAlign: 'center',
  }),
  triangle: css({
    width: 0,
    height: 0,
    borderLeft: '10px solid transparent',
    borderRight: '10px solid transparent',
    borderTop: `10px solid ${colors.gray700}`,
  }),
};

const Tooltip: React.FC = ({ children }) => (
  <div className={styles.main}>
    <div className={styles.container}>{children}</div>
    <div className={styles.triangle} />
  </div>
);

export default Tooltip;
