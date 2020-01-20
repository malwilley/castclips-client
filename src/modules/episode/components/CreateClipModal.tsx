import React, { useState } from 'react'
import ScissorsIcon from 'mdi-react/ScissorsIcon'
import Modal from 'components/Modal'
import StyledInput, { StyledInputLabel } from 'components/StyledInput'
import { css } from 'emotion'
import Asterisk from 'components/Asterisk'
import { useDispatch, useSelector } from 'react-redux'
import StyledTextArea from 'components/StyledTextArea'
import pick from 'ramda/es/pick'
import CharacterCounter from 'components/CharacterCounter'
import { actions } from '../redux/actions'
import useModalState from 'modules/modal/hooks/useModalState'
import { getEpisodeUnion } from '../selectors'

type ShareModalProps = {
  start: number
  end: number
  handleClose: () => void
  isOpen: boolean
}

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
}

const CreateClipModal: React.SFC<ShareModalProps> = ({ handleClose, start, end, isOpen }) => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const episode = useSelector(getEpisodeUnion)
  const modalState = useModalState({ handleClose })

  const handleCreate = () => {
    if (episode.type !== 'success') {
      return
    }

    dispatch(
      actions.createClip({
        audio: episode.data.audio,
        episode: pick(
          ['id', 'title', 'description', 'published', 'audioLength', 'thumbnail'],
          episode.data
        ),
        podcast: pick(['id', 'title', 'description', 'thumbnail'], episode.data.podcast),
        title,
        description,
        start,
        end,
      })
    )
  }

  const valid = title.length > 0 && title.length < 200 && description.length < 2000

  return (
    <Modal
      handleClose={handleClose}
      isOpen={isOpen}
      icon={<ScissorsIcon />}
      primaryButtonProps={
        modalState.type === 'sending'
          ? { active: false, children: 'Creating...' }
          : { active: valid, onClick: handleCreate, children: 'Create' }
      }
      title="Create a clip"
    >
      <div className={styles.container}>
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
          />
          <CharacterCounter className={styles.counter} max={2000} text={description} />
        </div>
      </div>
    </Modal>
  )
}

export default CreateClipModal
