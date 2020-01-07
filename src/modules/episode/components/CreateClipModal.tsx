import * as React from 'react'
import ScissorsIcon from 'mdi-react/ScissorsIcon'
import Modal from 'components/Modal'
import StyledInput, { StyledInputLabel } from 'components/StyledInput'
import { css } from 'emotion'
import Asterisk from 'components/Asterisk'
import { connect } from 'react-redux'
import { thunks } from '../redux'
import { AppState } from 'redux/types'
import { EpisodeState } from '../types'
import StyledTextArea from 'components/StyledTextArea'
import pick from 'ramda/es/pick'
import { AddClipPayload } from 'api/types'
import CharacterCounter from 'components/CharacterCounter'

type ShareModalProps = {
  start: number
  end: number
  handleClose: () => void
  isOpen: boolean
}

type ShareModalConnectedProps = ShareModalProps & {
  clipId: EpisodeState['view']['clipId']
  createClip: (clip: AddClipPayload) => void
  episode: EpisodeState['metadata']
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

const CreateClipModal: React.SFC<ShareModalConnectedProps> = ({
  clipId,
  createClip,
  episode,
  handleClose,
  start,
  end,
  isOpen,
}) => {
  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')

  const handleCreate = () => {
    if (episode.type !== 'success') {
      return
    }

    createClip({
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
  }

  const valid = title.length > 0 && title.length < 200 && description.length < 2000

  return (
    <Modal
      handleClose={handleClose}
      isOpen={isOpen}
      icon={<ScissorsIcon />}
      primaryButtonProps={
        clipId.type === 'fetching'
          ? { active: false, children: 'Creating...' }
          : { active: valid, onClick: handleCreate, children: 'Create' }
      }
      title="Create a clip"
    >
      <div className={styles.container}>
        {/* podcast/episode/clip info */}
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

const mapStateToProps = (state: AppState) => ({
  clipId: state.episode.view.clipId,
  episode: state.episode.metadata,
})

const mapDispatchToProps = {
  createClip: thunks.createClip,
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateClipModal)
