import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'redux/types';
import { getUserUid } from 'modules/auth/selectors';
import SectionHeader from 'components/SectionHeader';
import Button from 'components/Button';
import EditIcon from 'mdi-react/EditIcon';
import DeleteIcon from 'mdi-react/DeleteIcon';
import { css } from 'emotion';
import { colors } from 'styles';
import EditClipModal from './EditClipModal';

const styles = {
  buttonsContainer: css({
    '& > :not(:last-child)': {
      marginRight: 12,
    },
    display: 'flex',
  }),
  iconCircle: css({
    '& > :not(:last-child)': {
      marginRight: 12,
    },
    justifyContent: 'flex-start',
    padding: '10px 14px',
    borderRadius: 8,
    border: '1px solid transparent',
    transition: 'border 200ms ease-out',
  }),
  edit: css({
    '&:hover': {
      border: `1px solid ${colors.green80}`,
    },
    backgroundColor: colors.green20,
    color: colors.green500,
  }),
  delete: css({
    '&:hover': {
      border: `1px solid ${colors.red80}`,
    },
    backgroundColor: colors.red20,
    color: colors.red500,
  }),
};

const ClipEditing: React.FC = () => {
  const metadata = useSelector((state: AppState) => state.clip.metadata);
  const userUid = useSelector(getUserUid);
  const [showEditModal, setShowEditModal] = useState(false);

  if (metadata.type !== 'success' || metadata.data.userId !== userUid) {
    return null;
  }

  return (
    <>
      <SectionHeader>Edit clip</SectionHeader>
      <div className={styles.buttonsContainer}>
        <Button
          className={css(styles.iconCircle, styles.edit)}
          onClick={() => setShowEditModal(true)}
        >
          <EditIcon size={22} />
          <div>Edit</div>
        </Button>
        <Button className={css(styles.iconCircle, styles.delete)}>
          <DeleteIcon size={22} />
          <div>Delete</div>
        </Button>
      </div>
      <EditClipModal isOpen={showEditModal} handleClose={() => setShowEditModal(false)} />
    </>
  );
};

export default ClipEditing;
