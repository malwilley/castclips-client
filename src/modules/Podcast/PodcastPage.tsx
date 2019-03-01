import * as React from 'react';
import PodcastCard from '~/modules/Podcast/PodcastCard';
import { thunks } from './redux';
import { connect } from 'react-redux';
import { AppState } from '~/redux/types';
import { PodcastState } from './types';
import InfoPage from '~/components/InfoPage';
import SectionHeader from '~/components/SectionHeader';
import { css } from 'emotion';
import LatestEpisodes from './components/LatestEpisodes';
import PodcastClips from './components/PodcastClips';
import HttpContent from '~/components/HttpContent';
import { colors } from '~/styles';

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
    display: 'grid',
    gridTemplateColumns: '[episodes] 2fr [clips] 1fr',
    gridColumnGap: 20,
  }),
  description: css({
    color: colors.dark,
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
    <InfoPage
      bodyContent={
        <div className={styles.main}>
          <section className={styles.episodes}>
            <SectionHeader className={styles.sectionHeader}>description</SectionHeader>
            <div className={styles.description}>
              <HttpContent
                request={podcastMetadata}
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
          <SectionHeader>podcast</SectionHeader>
          <h1>{podcastMetadata.type === 'success' && podcastMetadata.data.title}</h1>
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
