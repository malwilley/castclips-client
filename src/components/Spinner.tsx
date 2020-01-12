import React from 'react'
import { css, keyframes } from 'emotion'
import { colors } from 'styles'
import LoadingIcon from 'mdi-react/LoadingIcon'

type SpinnerProps = {
  size?: number
}

const spin = keyframes({
  from: {
    transform: 'rotate(0deg)',
  },
  to: {
    transform: 'rotate(360deg)',
  },
})

const styles = {
  main: css({
    fill: colors.primary500,
    animation: `${spin} 500ms linear infinite`,
  }),
}

const Spinner: React.SFC<SpinnerProps> = ({ size = 30 }) => {
  return <LoadingIcon className={styles.main} size={size} />
}

export default Spinner
