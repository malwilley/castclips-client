import React from 'react'
import { useSelector } from 'react-redux'
import PodcastClipCard from './PodcastClipCard'
import { css } from 'emotion'
import PodcastClipCardFetching from './PodcastClipCardFetching'
import PodcastClipsNoData from './PodcastClipsNoData'
import { getPodcastClips } from '../selectors'
import MapUnion from 'components/MapUnion'
import NoData from 'components/NoData'

const styles = {
  main: css({
    '& > :not(:last-child)': {
      marginBottom: 18,
    },
  }),
}

const PodcastClips: React.FC = () => {
  const clipsUnion = useSelector(getPodcastClips)

  return (
    <div className={styles.main}>
      <MapUnion
        map={{
          not_asked: () => null,
          fetching: () => (
            <>
              {Array(3)
                .fill(0)
                .map((_, index) => (
                  <PodcastClipCardFetching key={index} />
                ))}
            </>
          ),
          success: ({ data: clips }) =>
            clips.length > 0 ? (
              <>
                {clips.map((clip) => (
                  <PodcastClipCard clip={clip} key={clip.id} />
                ))}
              </>
            ) : (
              <PodcastClipsNoData />
            ),
          error: () => <NoData message="Failed to find clips" />,
        }}
        union={clipsUnion}
      />
    </div>
  )
}

export default PodcastClips
