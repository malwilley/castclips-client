import React from 'react'
import { css, keyframes } from 'emotion'
import { colors } from 'styles'

const indeterminateProgress = keyframes({
  from: {
    backgroundPosition: '200% 0',
  },
  to: {
    backgroundPosition: '-200% 0',
  },
})

const styles = {
  main: css({
    position: 'absolute',
    top: 0,
    left: 2,
    right: 2,
    borderRadius: '8px 8px 0 0',
    height: 4,
    backgroundImage: `linear-gradient(to right,${colors.tertiary100} 30%,transparent 30%)`,
    animation: `${indeterminateProgress} linear 1s infinite`,
    backgroundPosition: 'top left',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '150% 150%',
  }),
}

const PlayerLoadingIndicator: React.FC = () => <div className={styles.main} />

export default PlayerLoadingIndicator
