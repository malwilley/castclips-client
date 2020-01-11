import React from 'react'
import { css } from 'emotion'
import { colors, fonts } from 'styles'

type ErrorMessageProps = { className?: string }

const styles = {
  main: css({
    color: colors.red400,
    ...fonts.text250,
  }),
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ className, children }) => (
  <div className={css(styles.main, className)}>{children}</div>
)

export default ErrorMessage
