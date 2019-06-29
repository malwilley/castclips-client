import * as React from 'react';
import PodcastCard from 'src/modules/podcast/PodcastCard';
import { thunks } from './redux';
import { connect } from 'react-redux';
import { AppState } from 'src/redux/types';
import { PodcastState } from './types';
import PageWithFeaturedContent from 'src/components/PageWithFeaturedContent';
import SectionHeader from 'src/components/SectionHeader';
import { css } from 'emotion';
import LatestEpisodes from './components/LatestEpisodes';
import PodcastClips from './components/PodcastClips';
import HttpContent from 'src/components/HttpContent';
import { colors } from 'src/styles';
import PageTitleFetching from 'src/components/PageTitleFetching';
import ParagraphSkeleton from 'src/components/ParagraphSkeleton';

type PodcastPageProps = {
  id: string;
};

type PodcastPageConnectedProps = PodcastPageProps & {
  episodes: PodcastState['episodes'];
  fetchClipsForPodcast: (id: string) => void;
  fetchPodcastMetadata: (id: string) => void;
  podcastMetadata: PodcastState['metadata'];
};

const styles = {
  main: css({
    '@media (max-width: 800px)': {
      gridTemplateColumns: '[episodes] 1fr',
    },
    display: 'grid',
    gridTemplateColumns: '[episodes] 2fr [clips] 1fr',
    gridColumnGap: 40,
    gridRowGap: 40,
  }),
  heading: css({
    '& > h1': {
      marginBottom: 6,
    },
    '& > h4': {
      color: colors.secondary,
    },
    marginBottom: 16,
  }),
  description: css({
    color: colors.gray600,
    marginBottom: 40,
  }),
  sectionHeader: css({
    marginBottom: 20,
  }),
  episodes: css({
    gridTemplateAreas: 'episodes',
  }),
  clips: css({
    gridTemplateAreas: 'clips',
  }),
  title: css({
    '@media (min-width: 600px)': {
      display: 'none',
    },
  }),
};

const PodcastPage: React.FC<PodcastPageConnectedProps> = ({
  episodes,
  fetchClipsForPodcast,
  fetchPodcastMetadata,
  podcastMetadata,
  id,
}) => {
  React.useEffect(() => {
    fetchPodcastMetadata(id);
    fetchClipsForPodcast(id);
  }, [id]);

  return (
    <PageWithFeaturedContent
      bodyContent={
        <div className={styles.main}>
          <section className={styles.episodes}>
            <SectionHeader className={styles.sectionHeader}>description</SectionHeader>
            <div className={styles.description}>
              <HttpContent
                request={podcastMetadata}
                renderFetching={() => <ParagraphSkeleton />}
                renderSuccess={({ description }) => (
                  <div dangerouslySetInnerHTML={{ __html: description }} />
                )}
              />
            </div>
            <SectionHeader className={styles.sectionHeader}>latest episodes</SectionHeader>
            <LatestEpisodes episodes={episodes} />
          </section>
          <section className={styles.clips}>
            <SectionHeader className={styles.sectionHeader}>user clips</SectionHeader>
            <PodcastClips />
          </section>
        </div>
      }
      featuredContent={<PodcastCard podcast={podcastMetadata} />}
      titleContent={
        <>
          <SectionHeader light>podcast</SectionHeader>
          <div className={styles.title}>
            <HttpContent
              request={podcastMetadata}
              renderFetching={() => <PageTitleFetching />}
              renderSuccess={({ title, publisher }) => (
                <div className={styles.heading}>
                  <h1>{title}</h1>
                  <h4>{publisher}</h4>
                </div>
              )}
            />
          </div>
        </>
      }
    />
  );
};

const mapDispatchToProps = {
  fetchClipsForPodcast: thunks.fetchClipsForPodcast,
  fetchPodcastMetadata: thunks.fetchPodcastMetadata,
};

const mapStateToProps = (state: AppState) => ({
  episodes: state.podcast.episodes,
  podcastMetadata: state.podcast.metadata,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PodcastPage);
