import * as React from 'react';
import PodcastCard from '~/modules/Podcast/PodcastCard';
import { thunks } from './redux';
import { connect } from 'react-redux';
import { AppState } from '~/redux/types';
import { PodcastState } from './types';
import InfoPage from '~/components/InfoPage';
import SectionHeader from '~/components/SectionHeader';
import { css } from 'emotion';
import UnionContent from '~/components/UnionContent';
import LatestEpisodes from './components/LatestEpisodes';

type PodcastPageProps = {
  id: string;
};

type PodcastPageConnectedProps = PodcastPageProps & {
  episodes: PodcastState['episodes'];
  fetchPodcastMetadata: (id: string) => void;
  podcastMetadata: PodcastState['metadata'];
};

const styles = {
  sectionHeader: css({
    marginBottom: 20,
  }),
};

const PodcastPage: React.FC<PodcastPageConnectedProps> = ({
  episodes,
  fetchPodcastMetadata,
  podcastMetadata,
  id,
}) => {
  React.useEffect(() => {
    fetchPodcastMetadata(id);
  }, [id]);

  return (
    <InfoPage
      bodyContent={
        <section>
          <SectionHeader className={styles.sectionHeader}>latest episodes</SectionHeader>
          <LatestEpisodes episodes={episodes} />
        </section>
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
