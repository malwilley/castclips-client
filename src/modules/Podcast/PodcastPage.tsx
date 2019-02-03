import * as React from 'react';
import EpisodeList from '~/modules/Podcast/EpisodeList';
import PodcastCard from '~/modules/Podcast/PodcastCard';
import './PodcastPage.css';
import { thunks } from './redux';
import { connect } from 'react-redux';
import { AppState } from '~/redux/types';
import { PodcastState } from './types';

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
      <React.Fragment>
        <section className="hero center bg-primary flex flex-column pt2 relative">
          <h1>Podcast</h1>
          <PodcastCard podcast={podcastMetadata} />
        </section>
        <section className="page-container pt-episodes">{this.renderEpisodes()}</section>
      </React.Fragment>
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
