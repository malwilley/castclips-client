import * as React from 'react';
import { ScissorsIcon } from 'mdi-react';
import Modal from '~/components/Modal';
import StyledInput, { StyledInputLabel } from '~/components/StyledInput';
import { css } from 'emotion';
import Asterisk from '~/components/Asterisk';

type ShareModalProps = {
  handleClose: () => void;
};

const styles = {
  bodyContainer: css({
    padding: 16,
  }),
  inputGroup: css({
    marginBottom: 16,
  }),
};

const ShareModal: React.SFC<ShareModalProps> = ({ handleClose }) => (
  <Modal
    handleClose={handleClose}
    icon={<ScissorsIcon />}
    primaryButtonProps={{ text: 'Create' }}
    title="Create a clip"
  >
    <div className={styles.bodyContainer}>
      {/* podcast/episode/clip info */}
      <div className={styles.inputGroup}>
        <StyledInputLabel>
          Clip title <Asterisk />
        </StyledInputLabel>
        <StyledInput
          handleTextChange={() => 1}
          placeholder="A descriptive title for your clip"
          text=""
        />
      </div>
      <div className={styles.inputGroup}>
        <StyledInputLabel>Clip description</StyledInputLabel>
        <StyledInput
          handleTextChange={() => 1}
          placeholder="If the title isn't enough, say more here!"
          text=""
        />
      </div>
    </div>
  </Modal>
);

export default ShareModal;
