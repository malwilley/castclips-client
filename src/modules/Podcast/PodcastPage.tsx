import * as React from 'react';
import EpisodeList from '~/modules/Podcast/EpisodeList';
import PodcastCard from '~/modules/Podcast/PodcastCard';
import { thunks } from './redux';
import { connect } from 'react-redux';
import { AppState } from '~/redux/types';
import { PodcastState } from './types';
import InfoPage from '~/components/InfoPage';
import SectionHeader from '~/components/SectionHeader';

type PodcastPageProps = {
  id: string;
};

type PodcastPageConnectedProps = PodcastPageProps & {
  episodes: PodcastState['episodes'];
  fetchPodcastMetadata: (id: string) => void;
  podcastMetadata: PodcastState['metadata'];
};

class PodcastPage extends React.Component<PodcastPageConnectedProps> {
  componentDidMount() {
    const { fetchPodcastMetadata, id } = this.props;
    fetchPodcastMetadata(id);
  }

  renderEpisodes = () =>
    this.props.episodes.type === 'success' ? (
      <EpisodeList episodes={this.props.episodes.data} />
    ) : null;

  render() {
    const { podcastMetadata } = this.props;

    return (
      <InfoPage
        bodyContent={<section>{this.renderEpisodes()}</section>}
        featuredContent={<PodcastCard podcast={podcastMetadata} />}
        titleContent={
          <>
            <SectionHeader>podcast</SectionHeader>
            <h1>{podcastMetadata.type === 'success' && podcastMetadata.data.title}</h1>
          </>
        }
      />
    );
  }
}

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
