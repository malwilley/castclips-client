import * as React from 'react';
import { ScissorsIcon } from 'mdi-react';
import Modal from '~/components/Modal';
import StyledInput, { StyledInputLabel } from '~/components/StyledInput';
import { css } from 'emotion';
import Asterisk from '~/components/Asterisk';
import { connect } from 'react-redux';
import { thunks } from '../redux';
import { AppState } from '~/redux/types';
import { EpisodeState } from '../types';
import { AddClipPayload } from '~/api/firebase';
import StyledTextArea from '~/components/StyledTextArea';

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

type ShareModalState = {
  title: string;
  description: string;
};

const styles = {
  bodyContainer: css({
    padding: 16,
  }),
  inputGroup: css({
    marginBottom: 16,
  }),
};

class CreateClipModal extends React.Component<ShareModalConnectedProps, ShareModalState> {
  state = {
    title: '',
    description: '',
  };

  createClip = () => {
    const { createClip, episode, start, end } = this.props;
    const { title, description } = this.state;

    console.log('here');
    console.log(episode);

    if (episode.type !== 'success') {
      console.error('Episode state not loaded in redux');
      return;
    }

    createClip({
      audio: episode.data.audio,
      episodeId: episode.data.id,
      podcastId: episode.data.podcast.id,
      title,
      description,
      start,
      end,
    });
  };

  render() {
    const { clipId, handleClose } = this.props;
    const { title, description } = this.state;

    return (
      <Modal
        handleClose={handleClose}
        icon={<ScissorsIcon />}
        primaryButtonProps={
          clipId.type === 'fetching'
            ? { active: false, text: 'Creating...' }
            : { onClick: this.createClip, text: 'Create!' }
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
              handleTextChange={text => this.setState({ title: text })}
              placeholder="A descriptive title for your clip"
              text={title}
            />
          </div>
          <div className={styles.inputGroup}>
            <StyledInputLabel>Clip description</StyledInputLabel>
            <StyledTextArea
              handleTextChange={text => this.setState({ description: text })}
              placeholder="If the title isn't enough, say more here!"
              text={description}
            />
          </div>
        </div>
      </Modal>
    );
  }
}

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
