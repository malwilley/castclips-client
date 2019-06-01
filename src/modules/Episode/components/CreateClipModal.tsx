import * as React from 'react';
import { ScissorsIcon } from 'mdi-react';
import Modal from 'src/components/Modal';
import StyledInput, { StyledInputLabel } from 'src/components/StyledInput';
import { css } from 'emotion';
import Asterisk from 'src/components/Asterisk';
import { connect } from 'react-redux';
import { thunks } from '../redux';
import { AppState } from 'src/redux/types';
import { EpisodeState } from '../types';
import StyledTextArea from 'src/components/StyledTextArea';
import pick from 'ramda/es/pick';
import { AddClipPayload } from 'src/api/types';

type ShareModalProps = {
  start: number;
  end: number;
  handleClose: () => void;
};

type ShareModalConnectedProps = ShareModalProps & {
  clipId: EpisodeState['view']['clipId'];
  createClip: (clip: AddClipPayload) => void;
  episode: EpisodeState['metadata'];
};

const styles = {
  bodyContainer: css({
    padding: 16,
  }),
  inputGroup: css({
    marginBottom: 16,
  }),
};

const CreateClipModal: React.SFC<ShareModalConnectedProps> = ({
  clipId,
  createClip,
  episode,
  handleClose,
  start,
  end,
}) => {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');

  const handleCreate = () => {
    if (episode.type !== 'success') {
      return;
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
    });
  };

  return (
    <Modal
      handleClose={handleClose}
      icon={<ScissorsIcon />}
      primaryButtonProps={
        clipId.type === 'fetching'
          ? { active: false, text: 'Creating...' }
          : { onClick: handleCreate, text: 'Create' }
      }
      title="Create a clip"
    >
      <div className={styles.bodyContainer}>
        {/* podcast/episode/clip info */}
        <div className={styles.inputGroup}>
          <StyledInputLabel>
            Clip title <Asterisk />
          </StyledInputLabel>
          <StyledInput
            focus
            handleTextChange={setTitle}
            placeholder="A descriptive title for your clip"
            text={title}
          />
        </div>
        <div className={styles.inputGroup}>
          <StyledInputLabel>Clip description</StyledInputLabel>
          <StyledTextArea
            handleTextChange={setDescription}
            placeholder="If the title isn't enough, say more here!"
            text={description}
          />
        </div>
      </div>
    </Modal>
  );
};

const mapStateToProps = (state: AppState) => ({
  clipId: state.episode.view.clipId,
  episode: state.episode.metadata,
});

const mapDispatchToProps = {
  createClip: thunks.createClip,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateClipModal);
