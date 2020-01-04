import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'redux/types';
import { getUserUid } from 'modules/auth/selectors';
import Button from 'components/Button';
import EditIcon from 'mdi-react/EditIcon';
import DeleteIcon from 'mdi-react/DeleteIcon';
import { css } from 'emotion';
import { colors, fonts } from 'styles';
import EditClipModal from './EditClipModal';
import DeleteClipModal from './DeleteClipModal';
import Card from 'components/Card';

const styles = {
  card: css({
    padding: '10px 0',
    marginTop: 40,
  }),
  option: css({
    '& > :not(:last-child)': {
      marginRight: 12,
    },
    '&:hover': {
      backgroundColor: colors.gray20,
    },
    justifyContent: 'flex-start',
    padding: '8px 12px',
    border: '1px solid transparent',
    width: '100%',
    color: colors.gray700,
    ...fonts.bold250,
  }),
  delete: css({
    '&:hover': {
      color: colors.white,
      backgroundColor: colors.red400,
    },
    color: colors.red400,
  }),
};

const ClipEditing: React.FC = () => {
  const metadata = useSelector((state: AppState) => state.clip.metadata);
  const userUid = useSelector(getUserUid);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  if (metadata.type !== 'success' || metadata.data.userId !== userUid) {
    return null;
  }

  return (
    <>
      <Card className={styles.card}>
        <Button className={styles.option} onClick={() => setShowEditModal(true)}>
          <EditIcon size={14} />
          <div>Edit clip</div>
        </Button>
        <Button
          className={css(styles.option, styles.delete)}
          onClick={() => setShowDeleteModal(true)}
        >
          <DeleteIcon size={14} />
          <div>Delete clip</div>
        </Button>
      </Card>
      <EditClipModal isOpen={showEditModal} handleClose={() => setShowEditModal(false)} />
      <DeleteClipModal isOpen={showDeleteModal} handleClose={() => setShowDeleteModal(false)} />
    </>
  );
};

export default ClipEditing;
