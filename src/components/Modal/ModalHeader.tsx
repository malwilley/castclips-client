import * as React from 'react'
import Button from 'components/Button'
import CloseIcon from 'mdi-react/CloseIcon'
import { css } from 'emotion'
import { colors } from 'styles'
import AccessibleLabel from '../AccessibleLabel'

export type ModalHeaderProps = {
  handleClose: () => void
  icon: React.ReactNode
  title: string
}

const styles = {
  closeButton: css({
    '&:hover': {
      color: colors.gray500,
    },
    color: colors.gray200,
    height: 30,
    width: 30,
    transition: 'color 300ms ease-out',
  }),
  icon: css({
    '& > svg': {
      fill: colors.secondary500,
      height: 12,
      width: 12,
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 28,
    width: 28,
    borderRadius: '50%',
    backgroundColor: colors.secondary50,
  }),
  iconTitleContainer: css({
    '& > :not(:last-child)': {
      marginRight: 12,
    },
    display: 'flex',
    alignItems: 'center',
  }),
  main: css({
    height: 70,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 18px 0px 24px',
  }),
  title: css({
    color: colors.gray600,
    fontSize: 18,
  }),
}

const ModalHeader: React.SFC<ModalHeaderProps> = ({ handleClose, icon, title }) => (
  <div className={styles.main}>
    <div className={styles.iconTitleContainer}>
      <div className={styles.icon}>{icon}</div>
      <h1 className={styles.title} id="modal-title">
        {title}
      </h1>
    </div>
    <Button aria-labelledby="close-modal" onClick={handleClose} className={styles.closeButton}>
      <AccessibleLabel id="close-modal">Close modal</AccessibleLabel>
      <CloseIcon size={18} />
    </Button>
  </div>
)

export default ModalHeader
