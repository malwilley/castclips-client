import React, { useCallback, useState } from 'react'
import Modal, { ModalFooter } from 'components/Modal'
import EditIcon from 'mdi-react/EditIcon'
import { useSelector, useDispatch } from 'react-redux'
import { getClipData } from '../selectors'
import CharacterCounter from 'components/CharacterCounter'
import StyledTextArea from 'components/StyledTextArea'
import StyledInput, { StyledInputLabel } from 'components/StyledInput'
import Asterisk from 'components/Asterisk'
import formatHrMinSec from 'utils/formatHrMinSec'
import parseHrMinSec from 'utils/parseHrMinSec'
import { css } from 'emotion'
import useModalState from 'modules/modal/hooks/useModalState'
import { colors, fonts } from 'styles'
import { actions } from '../redux/actions'
import ErrorMessage from 'components/ErrorMessage'
import PrimaryButton from 'components/PrimaryButton'

const styles = {
  container: css({
    '& > :not(:last-child)': {
      marginBottom: '1rem',
    },
  }),
  counter: css({
    textAlign: 'right',
    paddingTop: '0.5em',
  }),
  startEndContainer: css({
    '& > :not(:last-child)': {
      marginRight: 12,
    },
    display: 'flex',
  }),
  timestampInput: css({
    width: 140,
  }),
  error: css({
    color: colors.red400,
    ...fonts.text250,
  }),
}

type EditClipModalProps = {
  handleClose: () => void
  isOpen: boolean
}

const formIsValid = ({
  title,
  description,
  start,
  end,
  episodeLength,
}: {
  title: string
  description: string
  start: number
  end: number
  episodeLength: number
}) => {
  if (title.length === 0 || title.length > 200) {
    return false
  }

  if (description.length > 2000) {
    return false
  }

  if (start < 0 || start >= end || end > episodeLength) {
    return false
  }

  return true
}

const EditClipModal: React.FC<EditClipModalProps> = ({ handleClose, isOpen }) => {
  const dispatch = useDispatch()
  const modalState = useModalState({ closeOnSuccess: true, handleClose, isOpen })
  const clipData = useSelector(getClipData)

  const [title, setTitle] = useState(clipData?.title ?? '')
  const [description, setDescription] = useState(clipData?.description ?? '')
  const [startStamp, setStartStamp] = useState(formatHrMinSec(clipData?.start ?? 0))
  const [endStamp, setEndStamp] = useState(formatHrMinSec(clipData?.end ?? 0))
  const start = parseHrMinSec(startStamp)
  const end = parseHrMinSec(endStamp)

  const valid = formIsValid({
    title,
    description,
    start,
    end,
    episodeLength: clipData?.episode.audioLength ?? 0,
  })

  const modifyClip = useCallback(() => {
    dispatch(
      actions.editClip({
        id: clipData!.id,
        title,
        description,
        start,
        end,
      })
    )
  }, [clipData, description, dispatch, end, start, title])

  const busy = modalState.type === 'sending'

  return (
    <Modal handleClose={handleClose} isOpen={isOpen} icon={<EditIcon />} title="Edit a clip">
      <form
        className={styles.container}
        data-testid="edit-clip-modal"
        onSubmit={(e) => {
          modifyClip()
          e.preventDefault()
        }}
      >
        <div className={styles.startEndContainer}>
          <div className={styles.timestampInput}>
            <StyledInputLabel htmlFor="start-input">
              Start <Asterisk />
            </StyledInputLabel>
            <StyledInput
              id="start-input"
              handleTextChange={setStartStamp}
              required
              value={startStamp}
              onBlur={() => setStartStamp(formatHrMinSec(parseHrMinSec(startStamp)))}
            />
          </div>
          <div className={styles.timestampInput}>
            <StyledInputLabel htmlFor="end-input">
              End <Asterisk />
            </StyledInputLabel>
            <StyledInput
              id="end-input"
              handleTextChange={setEndStamp}
              required
              value={endStamp}
              onBlur={() => setEndStamp(formatHrMinSec(parseHrMinSec(endStamp)))}
            />
          </div>
        </div>
        <div>
          <StyledInputLabel htmlFor="title-input">
            Clip title <Asterisk />
          </StyledInputLabel>
          <StyledInput
            id="title-input"
            handleTextChange={setTitle}
            placeholder="A descriptive title for your clip"
            required
            value={title}
            disabled={busy}
          />
          <CharacterCounter className={styles.counter} max={200} text={title} />
        </div>
        <div>
          <StyledInputLabel htmlFor="description-input">Clip description</StyledInputLabel>
          <StyledTextArea
            id="description-input"
            handleTextChange={setDescription}
            placeholder="If the title isn't enough, say more here!"
            text={description}
            disabled={busy}
          />
          <CharacterCounter className={styles.counter} max={2000} text={description} />
        </div>
        <div>
          {modalState.type === 'error' && <ErrorMessage>{modalState.message}</ErrorMessage>}
        </div>
        <ModalFooter>
          <PrimaryButton active={valid && !busy} type="submit" data-testid="edit-clip-modal-submit">
            {busy ? 'Modifying...' : 'Modify'}
          </PrimaryButton>
        </ModalFooter>
      </form>
    </Modal>
  )
}

export default EditClipModal
