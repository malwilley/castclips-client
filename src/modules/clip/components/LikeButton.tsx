import * as React from 'react';
import { AppState } from 'src/redux/types';
import { css } from 'emotion';
import { colors, boxShadow } from 'src/styles';
import Button from 'src/components/Button';
import { ThumbUpOutlineIcon, ThumbUpIcon, HeartIcon } from 'mdi-react';
import SecondaryButton from 'src/components/SecondaryButton';

type LikeButtonProps = {
  id: string;
  hasLiked: boolean;
  likeClip: (id: string) => void;
  numLikes: number;
  unlikeClip: (id: string) => void;
};

const styles = {
  main: css({
    transition: '200ms background-color ease-out',
    padding: '0 14px 0 8px',
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
    <SecondaryButton className={styles.main} onClick={onClick}>
      <HeartIcon className={css(styles.icon, hasLiked && styles.iconSelected)} size={20} />
      <span>{numLikes || 0}</span>
    </SecondaryButton>
  );
};

export default LikeButton;
