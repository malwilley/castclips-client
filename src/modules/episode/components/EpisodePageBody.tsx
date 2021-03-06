import React from 'react'
import { EpisodeState } from '../types'
import HttpContent from 'components/HttpContent'
import { css } from 'emotion'
import { colors, fonts, clickable } from 'styles'
import SectionHeader from 'components/SectionHeader'
import ParagraphSkeleton from 'components/ParagraphSkeleton'
import EpisodeClips from './EpisodeClips'
import EpisodeInformation from './EpisodeInformation'
import TruncateContent from 'components/TruncateContent'

type EpisodePageBodyProps = {
  episodeMetadata: EpisodeState['metadata']
  id: string
}

const styles = {
  main: css({
    '@media (max-width: 800px)': {
      gridTemplateColumns: '[left] 1fr',
    },
    display: 'grid',
    gridTemplateColumns: '[left] 2fr [right] 1fr',
    gridColumnGap: 40,
    gridRowGap: 40,
  }),
  description: css(fonts.text300, {
    '& a': {
      ...clickable,
      textDecoration: 'underline',
    },
    color: colors.gray600,
  }),
  published: css({
    '& > svg': {
      fill: colors.gray600,
      marginRight: 8,
    },
    color: colors.gray500,
    display: 'flex',
    alignItems: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontSize: 12,
    fontWeight: 'bold',
    margin: '20px 0 0 0',
  }),
  title: css({
    marginBottom: 6,
  }),
}

const EpisodePageBody: React.FC<EpisodePageBodyProps> = ({ episodeMetadata, id }) => (
  <div className={styles.main}>
    <HttpContent
      request={episodeMetadata}
      renderFetching={() => (
        <section>
          <SectionHeader>description</SectionHeader>
          <ParagraphSkeleton />
        </section>
      )}
      renderSuccess={({ description }) => (
        <section>
          <SectionHeader>description</SectionHeader>
          <TruncateContent maxHeight={200} expandable>
            <div className={styles.description} dangerouslySetInnerHTML={{ __html: description }} />
          </TruncateContent>
        </section>
      )}
    />
    <div>
      <SectionHeader>episode information</SectionHeader>
      <EpisodeInformation episodeMetadata={episodeMetadata} />
      <SectionHeader top>clips from the episode</SectionHeader>
      <EpisodeClips episodeId={id} />
    </div>
  </div>
)

export default EpisodePageBody
