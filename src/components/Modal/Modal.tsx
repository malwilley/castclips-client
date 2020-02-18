import React from 'react'
import Background from 'components/Modal/Background'
import { css } from 'emotion'
import ModalHeader, { ModalHeaderProps } from 'components/Modal/ModalHeader'
import { colors, boxShadow } from 'styles'

type ModalProps = ModalHeaderProps & {
  handleClose: () => void
  isOpen: boolean
  width?: number
}

const styles = {
  bodyContainer: css({
    padding: '0 24px 24px 24px',
  }),
  main: css({
    borderRadius: 8,
    background: colors.white,
    boxShadow: boxShadow.cardHover,
    width: '100%',
  }),
}

const Modal: React.SFC<ModalProps> = ({ children, handleClose, isOpen, icon, title, width }) => (
  <Background handleClose={handleClose} isOpen={isOpen} width={width}>
    <div className={styles.main}>
      <ModalHeader {...{ handleClose, icon, title }} />
      <div className={styles.bodyContainer}>{children}</div>
    </div>
  </Background>
)

export default Modal
