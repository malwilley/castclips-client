import { HomeState } from '../types'
import { css } from 'emotion'
import { range } from 'ramda'
import HotClip, { HotClipSkeleton } from './HotClip'
import React from 'react'
import MasonryGrid from 'components/MasonryGrid'
import { breakpoints } from 'styles'
import MapUnion from 'components/MapUnion'

type HotClipsProps = {
  hotClips: HomeState['hotClips']
}

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
}

const HotClips: React.FC<HotClipsProps> = ({ hotClips }) => (
  <div className={styles.clipsContainer}>
    <MapUnion
      map={{
        not_asked: () => null,
        error: () => <div>Error</div>,
        fetching: () => (
          <MasonryGrid minColumnWidth={300}>
            {range(0, 20).map(i => (
              <HotClipSkeleton key={i} />
            ))}
          </MasonryGrid>
        ),
        success: ({ data: clips }) => (
          <MasonryGrid minColumnWidth={300}>
            {clips.map(clip => (
              <HotClip clip={clip} key={clip.id} />
            ))}
          </MasonryGrid>
        ),
      }}
      union={hotClips}
    />
  </div>
)

export default HotClips
