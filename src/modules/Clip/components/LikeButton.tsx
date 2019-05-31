import * as React from 'react';
import { AppState } from '~/redux/types';
import { css } from 'emotion';
import { colors, boxShadow } from '~/styles';
import Button from '~/components/Button';
import { ThumbUpOutlineIcon, ThumbUpIcon } from 'mdi-react';

type LikeButtonProps = {
  id: string;
  hasLiked: boolean;
  likeClip: (id: string) => void;
  numLikes: number;
  unlikeClip: (id: string) => void;
};

const styles = {
  main: css({
    '&:hover': {
      boxShadow: boxShadow.normal,
    },
    color: colors.secondary400,
    background: colors.secondary20,
    borderRadius: 8,
    padding: '12px 18px',
    transition: '200ms box-shadow ease-out',
  }),
  icon: css({
    marginRight: 12,
  }),
};

const LikeButton: React.FC<LikeButtonProps> = ({
  id,
  hasLiked,
  likeClip,
  numLikes,
  unlikeClip,
}) => {
  const onClick = React.useCallback(() => (hasLiked ? unlikeClip(id) : likeClip(id)), [
    hasLiked,
    unlikeClip,
    likeClip,
    id,
  ]);

  return (
    <Button className={styles.main} onClick={onClick}>
      {hasLiked ? (
        <ThumbUpIcon className={styles.icon} size={18} />
      ) : (
        <ThumbUpOutlineIcon className={styles.icon} size={18} />
      )}
      <span>{numLikes || 0}</span>
    </Button>
  );
};

export default LikeButton;
