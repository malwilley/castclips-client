import React from 'react'
import { css } from 'emotion'

type AccessibleLabelProps = {
  id?: string
}

const styles = {
  main: css({
    clip: 'rect(1px, 1px, 1px, 1px)',
    position: 'absolute',
  }),
}

const AccessibleLabel: React.FC<AccessibleLabelProps> = ({ children, id }) => (
  <span className={styles.main} id={id}>
    {children}
  </span>
)

export default AccessibleLabel
