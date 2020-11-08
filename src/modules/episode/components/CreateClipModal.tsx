import React, { useState } from 'react'
import ScissorsIcon from 'mdi-react/ScissorsIcon'
import Modal, { ModalFooter } from 'components/Modal'
import StyledInput, { StyledInputLabel } from 'components/StyledInput'
import { css } from 'emotion'
import Asterisk from 'components/Asterisk'
import { useDispatch, useSelector } from 'react-redux'
import StyledTextArea from 'components/StyledTextArea'
import pick from 'ramda/es/pick'
import CharacterCounter from 'components/CharacterCounter'
import { actions } from '../redux/actions'
import useModalState from 'modules/modal/hooks/useModalState'
import { getEpisodeData } from '../selectors'
import PrimaryButton from 'components/PrimaryButton'
import { fonts } from 'styles'
import Card from 'components/Card'
import ClipCardAccent from 'components/ClipCardAccent'
import Timestamp from 'components/Timestamp'
import ArrowRightIcon from 'mdi-react/ArrowRightIcon'

type ShareModalProps = {
  start: number
  end: number
  handleClose: () => void
  isOpen: boolean
}

const styles = {
  container: css({
    '& > :not(:last-child)': {
      marginBottom: '0.5rem',
    },
  }),
  counter: css({
    textAlign: 'right',
    paddingTop: '0.5em',
  }),
  clipInfoCard: css({
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    marginBottom: 20,
    padding: 10,
  }),
  thumbnail: css({
    width: 65,
    height: 65,
    borderRadius: 8,
    marginRight: 10,
  }),
  infoTextContainer: css({
    '& > *': {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    flex: 1,
    minWidth: 0,
    whiteSpace: 'nowrap',
    ...fonts.bold250,
  }),
  timestampsContainer: css({
    '& > :not(:last-child)': {
      marginRight: 6,
    },
    display: 'flex',
    alignItems: 'center',
    marginTop: 4,
    ...fonts.text250,
  }),
}

const CreateClipModal: React.SFC<ShareModalProps> = ({ handleClose, start, end, isOpen }) => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const episode = useSelector(getEpisodeData)!
  const modalState = useModalState({ handleClose, isOpen })

  const handleCreate = () => {
    dispatch(
      actions.createClip({
        audio: episode.audio,
        episode: pick(
          ['id', 'title', 'description', 'published', 'audioLength', 'thumbnail'],
          episode
        ),
        podcast: pick(['id', 'title', 'description', 'thumbnail'], episode.podcast),
        title,
        description,
        start,
        end,
      })
    )
  }

  const busy = modalState.type === 'sending'
  const valid = title.length > 0 && title.length < 200 && description.length < 2000

  return (
    <Modal handleClose={handleClose} isOpen={isOpen} icon={<ScissorsIcon />} title="Create a clip">
      <Card className={styles.clipInfoCard}>
        <ClipCardAccent start={start} end={end} length={episode.audioLength} />
        <img
          className={styles.thumbnail}
          alt={episode.podcast.title}
          src={episode.podcast.thumbnail}
        />
        <div className={styles.infoTextContainer}>
          <div>{episode.podcast.title}</div>
          <div>{episode.title}</div>
          <div className={styles.timestampsContainer}>
            <Timestamp seconds={start} /> <ArrowRightIcon size={12} /> <Timestamp seconds={end} />
          </div>
        </div>
      </Card>
      <form
        className={styles.container}
        data-testid="create-clip-modal"
        onSubmit={(e) => {
          handleCreate()
          e.preventDefault()
        }}
      >
        <div>
          <StyledInputLabel htmlFor="title-input">
            Clip title <Asterisk />
          </StyledInputLabel>
          <StyledInput
            id="title-input"
            focus
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
        <ModalFooter>
          <PrimaryButton active={valid && !busy} data-testid="modal-create-clip">
            {busy ? 'Creating...' : 'Create'}
          </PrimaryButton>
        </ModalFooter>
      </form>
    </Modal>
  )
}

export default CreateClipModal
