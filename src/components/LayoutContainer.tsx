import * as React from 'react'
import { css } from 'emotion'

type LayoutContainerProps = {
  className?: string
}

const styles = {
  main: css({
    '@media (max-width: 1800px)': {
      maxWidth: 1040,
    },
    margin: '0 auto',
    maxWidth: 1240,
    padding: '0 20px',
    width: '100%',
  }),
}

const LayoutContainer: React.FC<LayoutContainerProps> = ({ children, className }) => (
  <div className={css(styles.main, className)}>{children}</div>
)

export default LayoutContainer
