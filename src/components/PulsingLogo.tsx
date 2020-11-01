import React from 'react'
import LogoWaves from 'icons/LogoWaves'
import { css, keyframes } from 'emotion'

type PulsingLogoProps = {}

const pulse = keyframes({
  'from, to': {
    opacity: 1,
  },
  '50%': {
    opacity: 0.3,
  },
})

const styles = {
  main: css({
    position: 'fixed',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  }),
  logo: css({
    animation: `${pulse} 3s ease-out infinite`,
    height: 100,
    width: 100,
  }),
}

const PulsingLogo: React.FC<PulsingLogoProps> = () => (
  <div className={styles.main}>
    <LogoWaves className={styles.logo} />
  </div>
)

export default PulsingLogo
