import React from 'react'
import { css } from 'emotion'
import { colors } from 'styles'

const styles = {
  main: css({
    color: colors.tertiary100,
    display: 'inline-block',
    marginLeft: 2,
  }),
}

const Asterisk: React.SFC = () => <div className={styles.main}>*</div>

export default Asterisk
