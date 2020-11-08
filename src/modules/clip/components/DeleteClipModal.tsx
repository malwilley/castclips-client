import React from 'react'
import Modal from 'components/Modal'
import DeleteIcon from 'mdi-react/DeleteIcon'
import { useSelector, useDispatch } from 'react-redux'
import { getClipData } from '../selectors'
import { css } from 'emotion'
import useModalState from 'modules/modal/hooks/useModalState'
import { fonts, colors } from 'styles'
import { actions } from '../redux/actions'
import ErrorMessage from 'components/ErrorMessage'
import PrimaryButton from 'components/PrimaryButton'

const styles = {
  container: css({
    '& > :not(:last-child)': {
      marginBottom: 20,
    },
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    ...fonts.text300,
  }),
  text: css({
    padding: '0 60px',
  }),
  clipTitle: css({
    ...fonts.bold300,
  }),
  deleteIcon: css({
    color: colors.red400,
    backgroundColor: colors.red20,
    borderRadius: '50%',
    width: 80,
    height: 80,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '-30px 0 0 0',
  }),
  deleteButton: css({
    width: '100%',
  }),
}

type DeleteClipModalProps = {
  handleClose: () => void
  isOpen: boolean
}

const DeleteClipModal: React.FC<DeleteClipModalProps> = ({ handleClose, isOpen }) => {
  const dispatch = useDispatch()
  const modalState = useModalState({ handleClose, isOpen })
  const clipData = useSelector(getClipData)!

  const busy = modalState.type === 'sending'

  return (
    <Modal handleClose={handleClose} isOpen={isOpen} width={400}>
      <form
        className={styles.container}
        data-testid="delete-clip-modal"
        onSubmit={(e) => {
          dispatch(actions.deleteClip(clipData!.id))
          e.preventDefault()
        }}
      >
        <div className={styles.deleteIcon}>
          <DeleteIcon size={48} />
        </div>
        <div className={styles.text}>
          <p>
            <strong>Are you sure you want to delete this clip?</strong>
          </p>
          <p>{clipData.title}</p>
        </div>
        {modalState.type === 'error' && <ErrorMessage>{modalState.message}</ErrorMessage>}
        <PrimaryButton
          className={styles.deleteButton}
          destructive
          active={!busy}
          type="submit"
          data-testid="delete-clip-modal-submit"
        >
          {busy ? 'Deleting...' : 'Delete'}
        </PrimaryButton>
      </form>
    </Modal>
  )
}

export default DeleteClipModal
