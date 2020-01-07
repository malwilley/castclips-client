import React from 'react'
import { css } from 'emotion'
import { colors } from 'styles'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from 'redux/types'
import { thunks } from '../redux'
import TextPointer from './TextPointer'
import HotClips from './HotClips'
import RoundedCorners from 'components/RoundedCorners'

const styles = {
  gradientContainer: css({
    '@media (max-width: 800px)': {
      borderRadius: '8px 8px 0 0',
    },
    borderRadius: '16px 16px 0 0',
    backgroundImage: colors.gradient,
    height: '25rem',
    position: 'relative',
  }),
  shareContainer: css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px',
    height: '100%',
  }),
  shareText: css({
    '@media (max-width: 800px)': {
      fontSize: '2rem',
    },
    fontSize: '3rem',
    color: colors.white,
    textAlign: 'center',
    lineHeight: 1,
  }),
  downPointer: css({
    marginBottom: 90,
  }),
  upPointer: css({
    marginTop: 32,
  }),
  hotClipsContainer: css({
    marginTop: -70,
    paddingBottom: 60,
  }),
  search: css({
    gridTemplateArea: 'search',
    margin: '0 auto',
  }),
  roundedCorners: css({
    position: 'absolute',
    bottom: 0,
  }),
}

const HomePage: React.FC = () => {
  const dispatch = useDispatch()
  const hotClips = useSelector((state: AppState) => state.home.hotClips)

  React.useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(thunks.fetchHotClips(0))
  }, [dispatch])

  return (
    <div>
      <div className={styles.gradientContainer}>
        <div className={styles.shareContainer}>
          <TextPointer className={styles.upPointer} direction="up">
            Try searching for a podcast you like
          </TextPointer>
          <h1 className={styles.shareText}>Share your favorite podcast moments.</h1>
          <TextPointer className={styles.downPointer} direction="down">
            Or see what's popular
          </TextPointer>
        </div>
        <RoundedCorners className={styles.roundedCorners} top />
      </div>
      <div className={styles.hotClipsContainer}>
        <HotClips hotClips={hotClips} />
      </div>
    </div>
  )
}

export default HomePage
