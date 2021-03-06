import React from 'react'
import { css } from 'emotion'
import { fonts, colors } from 'styles'
import formatHrMinSec from 'utils/formatHrMinSec'

type TimestampProps = {
  className?: string
  seconds: number
}

const styles = {
  main: css(fonts.bold200, {
    color: colors.gray700,
    border: `1px solid ${colors.gray50}`,
    padding: '4px 8px',
    borderRadius: 4,
  }),
}

const Timestamp: React.FC<TimestampProps> = ({ className, seconds }) => (
  <div className={css(styles.main, className)}>{formatHrMinSec(seconds, true)}</div>
)

export default Timestamp
