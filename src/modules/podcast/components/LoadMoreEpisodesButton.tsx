import React from 'react'
import { useDispatch } from 'react-redux'
import Button from 'components/Button'
import { PodcastState } from '../types'
import Spinner from 'components/Spinner'
import { css } from 'emotion'
import { colors, fonts } from 'styles'
import { actions } from '../redux'
import MapUnion from 'components/MapUnion'

type LoadMoreEpisodesProps = {
  episodes: PodcastState['episodes']
}

const styles = {
  loadMoreRow: css({
    height: 50,
    width: '100%',
    color: colors.gray600,
    ...fonts.bold250,
  }),
}

const LoadMoreEpisodesButton: React.FC<LoadMoreEpisodesProps> = ({ episodes }) => {
  const dispatch = useDispatch()

  return (
    <MapUnion
      map={{
        fetching: () => (
          <Button active={false} className={styles.loadMoreRow}>
            <Spinner />
          </Button>
        ),
        success: () => (
          <Button
            className={styles.loadMoreRow}
            onClick={() => dispatch(actions.fetchMorePodcastEpisodes())}
          >
            Show more
          </Button>
        ),
        error: () => (
          <Button className={styles.loadMoreRow}>Error loading episodes, try again?</Button>
        ),
        not_asked: () => null,
        end: () => null,
      }}
      union={episodes}
    />
  )
}

export default LoadMoreEpisodesButton
