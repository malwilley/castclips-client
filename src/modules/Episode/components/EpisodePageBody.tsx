import * as React from 'react';
import { EpisodeState } from '../types';
import HttpContent from 'src/components/HttpContent';
import { css } from 'emotion';
import { colors } from 'src/styles';
import SectionHeader from 'src/components/SectionHeader';
import ParagraphSkeleton from 'src/components/ParagraphSkeleton';
import EpisodeClips from './EpisodeClips';
import EpisodeInformation from './EpisodeInformation';

type EpisodePageBodyProps = {
  episodeMetadata: EpisodeState['metadata'];
  id: string;
};

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
  description: css({
    color: colors.gray600,
    maxHeight: 180,
    overflow: 'hidden',
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
  subTitle: css({
    '& > a': {
      color: colors.lightest,
      marginLeft: 4,
    },
    color: colors.secondary,
  }),
  title: css({
    marginBottom: 6,
  }),
};

const EpisodePageBody: React.FC<EpisodePageBodyProps> = ({ episodeMetadata, id }) => (
  <div className={styles.main}>
    <HttpContent
      request={episodeMetadata}
      renderFetching={() => (
        <section>
          <SectionHeader>description</SectionHeader>
          <p>
            <ParagraphSkeleton />
          </p>
        </section>
      )}
      renderSuccess={({ description }) => (
        <section>
          <SectionHeader>description</SectionHeader>
          <div className={styles.description} dangerouslySetInnerHTML={{ __html: description }} />
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
);

export default EpisodePageBody;
