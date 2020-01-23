import React from 'react'
import { css } from 'emotion'

type LogoProps = {
  className?: string
}

const styles = {
  main: css({
    fontSize: '2rem',
    fontWeight: 'bold',
  }),
}

const Logo: React.FC<LogoProps> = ({ className }) => (
  <div className={css(styles.main, className)}>castclips</div>
)

export default Logo
