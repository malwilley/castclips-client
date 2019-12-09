import React from 'react';
import { Logo } from 'icons';
import { css, keyframes } from 'emotion';

type PulsingLogoProps = {};

const pulse = keyframes({
  'from, to': {
    opacity: 1,
  },
  '50%': {
    opacity: 0.5,
  },
});

const styles = {
  main: css({
    position: 'fixed',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  }),
  logo: css({
    animation: `${pulse} 3s ease-out infinite`,
    height: 60,
    width: 248,
  }),
};

const PulsingLogo: React.FC<PulsingLogoProps> = () => (
  <div className={styles.main}>
    <Logo className={styles.logo} />
  </div>
);

export default PulsingLogo;
