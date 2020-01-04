import React, { useCallback } from 'react';
import Modal from 'components/Modal';
import DeleteIcon from 'mdi-react/DeleteIcon';
import { useSelector } from 'react-redux';
import { getClipData } from '../selectors';
import { css } from 'emotion';
import useModalState from 'modules/modal/hooks/useModalState';
import useThunkDispatch from 'hooks/useThunkDispatch';
import thunks from '../redux/thunks';
import { fonts } from 'styles';

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
    padding: 40,
    ...fonts.text300,
  }),
  clipTitle: css({
    ...fonts.bold300,
  }),
};

type DeleteClipModalProps = {
  handleClose: () => void;
  isOpen: boolean;
};

const DeleteClipModal: React.FC<DeleteClipModalProps> = ({ handleClose, isOpen }) => {
  const thunkDispatch = useThunkDispatch();
  const modalState = useModalState({ handleClose });
  const clipData = useSelector(getClipData);

  const deleteClip = useCallback(() => {
    thunkDispatch(thunks.deleteClip(clipData!.id));
  }, [clipData, thunkDispatch]);

  return (
    <Modal
      handleClose={handleClose}
      isOpen={isOpen}
      icon={<DeleteIcon />}
      primaryButtonProps={
        modalState.type === 'sending'
          ? { active: false, children: 'Deleting...', destructive: true }
          : { active: true, onClick: deleteClip, children: 'Delete', destructive: true }
      }
      title="Delete a clip"
    >
      <div className={styles.container}>
        <div>Are you sure you want to delete the clip?</div>
        <div className={styles.clipTitle}>{clipData!.title}</div>
      </div>
    </Modal>
  );
};

export default DeleteClipModal;
