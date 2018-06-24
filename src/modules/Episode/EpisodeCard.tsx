import * as React from 'react';
import './EpisodeCard.css';
import { HttpRequest, Episode } from '../../types/index';
import FeatureCard from '../../components/FeatureCard/FeatureCard';
import PodcastPlayer from '../PodcastPlayer/PodcastPlayer';

interface Props {
  episode: HttpRequest<Episode>;
}

interface State {}

class EpisodeCard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  renderEpisodeData(episode: Episode) {
    return (
      <div className="flex card down-half slide-in-fifty">
        <div className="flex flex-column flex-auto left-align px3 py1">
          <p className="flex-auto overflow-ellipsis m0">{episode.description}</p>
          <PodcastPlayer episode={episode} />
        </div>
      </div>
    );
  }

  render() {
    const { episode, ...rest } = this.props;
    return (
      <FeatureCard content={episode} renderContent={e => this.renderEpisodeData(e)} {...rest} />
    );
  }
}

export default EpisodeCard;
