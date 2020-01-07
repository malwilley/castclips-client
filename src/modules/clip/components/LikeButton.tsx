import * as React from 'react'
import { css } from 'emotion'
import { colors, clickable } from 'styles'
import Button from 'components/Button'
import HeartIcon from 'mdi-react/HeartIcon'
import { useDispatch } from 'react-redux'
import { thunks } from '../redux'
import AccessibleLabel from 'components/AccessibleLabel'

type LikeButtonProps = {
  id: string
  hasLiked: boolean
  numLikes: number
}

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
}

const LikeButton: React.FC<LikeButtonProps> = ({ id, hasLiked, numLikes }) => {
  const dispatch = useDispatch()

  const onClick = React.useCallback(
    () => (hasLiked ? dispatch(thunks.unlikeClip(id)) : dispatch(thunks.likeClip(id))),
    [dispatch, hasLiked, id]
  )

  return (
    <Button aria-labelledby="like-label" className={styles.main} onClick={onClick}>
      <AccessibleLabel id="like-label">Like this clip</AccessibleLabel>
      <HeartIcon
        aria-hidden
        className={css(styles.icon, hasLiked && styles.iconSelected)}
        size={24}
      />
      <span title={`${numLikes} ${numLikes === 1 ? 'person has' : 'people have'} liked this clip`}>
        {numLikes || 0}{' '}
      </span>
    </Button>
  )
}

export default LikeButton
