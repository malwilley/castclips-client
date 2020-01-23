import React from 'react'
import { css } from 'emotion'

const styles = {
  main: css({
    '& > :not(:last-child)': {
      marginRight: 20,
    },
    height: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 24px',
  }),
}

const ModalFooter: React.SFC = ({ children }) => <div className={styles.main}>{children}</div>

export default ModalFooter
