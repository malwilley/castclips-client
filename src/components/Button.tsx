import { css } from 'emotion'
import React from 'react'
import { fonts } from 'styles'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean
  className?: string
  onClick?: () => void
}

const styles = {
  main: css(fonts.bold300, {
    '&::-moz-focus-inner': {
      border: 0,
    },
    '&:disabled': {
      cursor: 'not-allowed',
    },
    alignItems: 'center',
    background: 'none',
    border: 0,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    outline: 0,
    padding: 0,
    userSelect: 'none',
  }),
}

const Button: React.SFC<ButtonProps> = ({
  active = true,
  className,
  children,
  onClick,
  ...props
}) => (
  <button className={css(styles.main, className)} disabled={!active} onClick={onClick} {...props}>
    {children}
  </button>
)

export default Button
