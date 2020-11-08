import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HttpContent from 'components/HttpContent'
import EpisodeClipCard from './EpisodeClipCard'
import { css } from 'emotion'
import NoData from 'components/NoData'
import { getEpisodeClipsUnion } from '../selectors'
import { actions } from '../redux/actions'

type EpisodeClipsProps = {
  episodeId: string
}

const styles = {
  container: css({
    '& > *': {
      marginBottom: 20,
    },
  }),
}

const EpisodeClips: React.SFC<EpisodeClipsProps> = ({ episodeId }) => {
  const dispatch = useDispatch()

  const episodeClipsUnion = useSelector(getEpisodeClipsUnion)

  useEffect(() => {
    dispatch(actions.fetchEpisodeClips(episodeId))
  }, [episodeId, dispatch])

  return (
    <HttpContent
      request={episodeClipsUnion}
      renderFetching={() => null}
      renderSuccess={(clips) =>
        clips.length > 0 ? (
          <div className={styles.container}>
            {clips.map((clip) => (
              <EpisodeClipCard clip={clip} key={clip.id} episodeLength={clip.episode.audioLength} />
            ))}
          </div>
        ) : (
          <NoData message="No one has made any clips for the episode yet. Be the first!" />
        )
      }
    />
  )
}

export default EpisodeClips
