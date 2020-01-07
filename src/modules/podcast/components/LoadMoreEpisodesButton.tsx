import * as React from 'react'
import { thunks } from '../redux'
import { connect } from 'react-redux'
import Button from 'components/Button'
import { PodcastState } from '../types'
import Spinner from 'components/Spinner/Spinner'
import { css } from 'emotion'
import { colors } from 'styles'

type LoadMoreEpisodesProps = {
  episodes: PodcastState['episodes']
}

type LoadMoreEpisodesConnectedProps = LoadMoreEpisodesProps & {
  fetchMoreEpisodes: () => Promise<void>
}

const styles = {
  loadMoreRow: css({
    height: 50,
    width: '100%',
    color: colors.gray600,
  }),
}

const LoadMoreEpisodesButton: React.FC<LoadMoreEpisodesConnectedProps> = ({
  episodes,
  fetchMoreEpisodes,
}) => {
  switch (episodes.type) {
    case 'fetching': {
      return (
        <Button active={false} className={styles.loadMoreRow}>
          <Spinner />
        </Button>
      )
    }
    case 'success': {
      return (
        <Button className={styles.loadMoreRow} onClick={fetchMoreEpisodes}>
          <h6>load more</h6>
        </Button>
      )
    }
    case 'error': {
      return (
        <Button className={styles.loadMoreRow}>
          <h6>error loading episodes, try again?</h6>
        </Button>
      )
    }
    case 'end':
    default:
      return null
  }
}

const mapDispatchToProps = {
  fetchMoreEpisodes: thunks.fetchMoreEpisodes,
}

export default connect(null, mapDispatchToProps)(LoadMoreEpisodesButton)
