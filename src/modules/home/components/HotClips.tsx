import { css } from 'emotion'
import { range } from 'ramda'
import HotClip, { HotClipSkeleton } from './HotClip'
import React from 'react'
import MasonryGrid from 'components/MasonryGrid'
import { breakpoints, boxShadow, fonts, colors } from 'styles'
import { useSelector, useDispatch } from 'react-redux'
import { getHotClips, isEndOfClips } from '../selectors'
import Button from 'components/Button'
import ErrorMessage from 'components/ErrorMessage'
import Spinner from 'components/Spinner'
import { actions } from '../redux/actions'

type HotClipsProps = {}

const styles = {
  clipsContainer: css(
    breakpoints.breakpoint800({
      padding: '0 40px',
    }),
    {
      margin: '0 auto',
      padding: '0 10px',
      maxWidth: 1400,
    }
  ),
  addClipsButton: css({
    '&:hover': {
      boxShadow: boxShadow.cardHover,
    },
    width: 160,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.white,
    boxShadow: boxShadow.card,
    color: colors.primary500,
    margin: '40px auto 0 auto',
    transition: 'box-shadow 200ms ease-out',
    ...fonts.bold300,
  }),
  error: css({
    margin: '20px auto 0 auto',
    textAlign: 'center',
  }),
}

const FetchMoreClips: React.FC = () => {
  const dispatch = useDispatch()
  const hotClips = useSelector(getHotClips)
  const end = useSelector(isEndOfClips)

  const fetching = hotClips.type === 'fetching'

  if (end) {
    return null
  }

  return (
    <Button
      className={styles.addClipsButton}
      disabled={fetching}
      onClick={() => dispatch(actions.fetchHotClips())}
    >
      {fetching ? <Spinner /> : <div>Load more</div>}
    </Button>
  )
}

const HotClips: React.FC<HotClipsProps> = () => {
  const hotClips = useSelector(getHotClips)

  if (hotClips.type === 'not_asked') {
    return null
  }

  return (
    <div className={styles.clipsContainer}>
      <MasonryGrid minColumnWidth={300}>
        {hotClips.data.map(clip => (
          <HotClip clip={clip} key={clip.id} />
        ))}
        {hotClips.type === 'fetching' ? range(0, 20).map(i => <HotClipSkeleton key={i} />) : []}
      </MasonryGrid>
      {hotClips.type === 'error' && (
        <ErrorMessage className={styles.error}>{hotClips.message}</ErrorMessage>
      )}
      <FetchMoreClips />
    </div>
  )
}

export default HotClips
