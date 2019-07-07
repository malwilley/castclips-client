import * as React from 'react';
import { css } from 'emotion';
import { colors, clickable } from 'src/styles';
import Button from 'src/components/Button';
import { HeartIcon } from 'mdi-react';
import { useDispatch } from 'react-redux';
import { thunks } from '../redux';

type LikeButtonProps = {
  id: string;
  hasLiked: boolean;
  numLikes: number;
};

const styles = {
  main: css(clickable, {
    display: 'flex',
    color: colors.gray700,
    padding: '6px 10px',
  }),
  icon: css({
    color: colors.gray50,
    marginRight: 10,
  }),
  iconSelected: css({
    color: colors.red,
  }),
};

const LikeButton: React.FC<LikeButtonProps> = ({ id, hasLiked, numLikes }) => {
  const dispatch = useDispatch();

  const onClick = React.useCallback(
    () => (hasLiked ? dispatch(thunks.unlikeClip(id)) : dispatch(thunks.likeClip(id))),
    [hasLiked, id]
  );

  return (
    <Button className={styles.main} onClick={onClick}>
      <HeartIcon className={css(styles.icon, hasLiked && styles.iconSelected)} size={24} />
      <span>{numLikes || 0}</span>
    </Button>
  );
};

export default LikeButton;
