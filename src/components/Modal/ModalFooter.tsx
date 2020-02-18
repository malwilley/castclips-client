import React from 'react'
import { css } from 'emotion'

const styles = {
  main: css({
    '& > :not(:last-child)': {
      marginRight: 20,
    },
    marginTop: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  }),
}

const ModalFooter: React.FC = ({ children }) => <div className={styles.main}>{children}</div>

export default ModalFooter
