import * as React from 'react';
import { css } from 'emotion';
import { colors, clickable } from 'src/styles';
import Button from 'src/components/Button';
import { HeartIcon } from 'mdi-react';

type LikeButtonProps = {
  id: string;
  hasLiked: boolean;
  likeClip: (id: string) => void;
  numLikes: number;
  unlikeClip: (id: string) => void;
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
      <HeartIcon className={css(styles.icon, hasLiked && styles.iconSelected)} size={24} />
      <span>{numLikes || 0}</span>
    </Button>
  );
};

export default LikeButton;
