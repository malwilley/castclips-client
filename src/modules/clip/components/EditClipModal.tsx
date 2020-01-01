import React, { useCallback, useState } from 'react';
import Modal from 'components/Modal';
import EditIcon from 'mdi-react/EditIcon';
import { useSelector } from 'react-redux';
import { getClipData } from '../selectors';
import CharacterCounter from 'components/CharacterCounter';
import StyledTextArea from 'components/StyledTextArea';
import StyledInput, { StyledInputLabel } from 'components/StyledInput';
import Asterisk from 'components/Asterisk';
import formatHrMinSec from 'utils/formatHrMinSec';
import parseHrMinSec from 'utils/parseHrMinSec';
import { css } from 'emotion';
import useModalState from 'modules/modal/hooks/useModalState';
import useThunkDispatch from 'hooks/useThunkDispatch';
import thunks from '../redux/thunks';

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
};

type EditClipModalProps = {
  handleClose: () => void;
  isOpen: boolean;
};

const formIsValid = ({
  title,
  description,
  start,
  end,
  episodeLength,
}: {
  title: string;
  description: string;
  start: number;
  end: number;
  episodeLength: number;
}) => {
  if (title.length === 0 || title.length > 200) {
    return false;
  }

  if (description.length > 2000) {
    return false;
  }

  if (start < 0 || start >= end || end > episodeLength) {
    return false;
  }

  return true;
};

const EditClipModal: React.FC<EditClipModalProps> = ({ handleClose, isOpen }) => {
  const thunkDispatch = useThunkDispatch();
  const modalState = useModalState({ closeOnSuccess: true, handleClose });
  const clipData = useSelector(getClipData);

  const [title, setTitle] = useState(clipData?.title ?? '');
  const [description, setDescription] = useState(clipData?.description ?? '');
  const [startStamp, setStartStamp] = useState(formatHrMinSec(clipData?.start ?? 0));
  const [endStamp, setEndStamp] = useState(formatHrMinSec(clipData?.end ?? 0));
  const start = parseHrMinSec(startStamp);
  const end = parseHrMinSec(endStamp);

  const valid = formIsValid({
    title,
    description,
    start,
    end,
    episodeLength: clipData?.episode.audioLength ?? 0,
  });

  const modifyClip = useCallback(() => {
    thunkDispatch(
      thunks.editClip({
        id: clipData!.id,
        title,
        description,
        start,
        end,
      })
    );
  }, [clipData, description, end, start, thunkDispatch, title]);

  return (
    <Modal
      handleClose={handleClose}
      isOpen={isOpen}
      icon={<EditIcon />}
      primaryButtonProps={
        modalState.type === 'sending'
          ? { active: false, children: 'Modifying...' }
          : { active: valid, onClick: modifyClip, children: 'Modify' }
      }
      title="Edit a clip"
    >
      <div className={styles.container}>
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
            />
          </div>
          <div className={styles.timestampInput}>
            <StyledInputLabel htmlFor="end-input">
              End <Asterisk />
            </StyledInputLabel>
            <StyledInput id="end-input" handleTextChange={setEndStamp} required value={endStamp} />
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
  );
};

export default EditClipModal;
