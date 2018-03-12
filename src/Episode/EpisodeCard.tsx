import * as React from 'react';
import './EpisodeCard.css';
import { HttpRequest, Episode } from '../types/index';
import FeatureCard from '../Common/FeatureCard/FeatureCard';
import AudioPlayer from '../Common/AudioPlayer/AudioPlayer';

interface Props {
  episode: HttpRequest<Episode>;
}

interface State {
}

class EpisodeCard extends React.Component<Props, State> {

  constructor (props: Props) {
    super(props);
  }

  renderEpisodeData (episode: Episode) {
    return (
      <div className="flex card down-half slide-in-fifty">
        <div className="flex flex-column flex-auto left-align px3 py1">
          <h3 className="flex-none">{episode.title}</h3>
          <p className="flex-auto overflow-ellipsis m0">{episode.description}</p>
          <AudioPlayer
            src={episode.mediaUrl}
            title={episode.title}
          />

        </div>
      </div>
    );
  }

  render () {
    return (
      <FeatureCard content={this.props.episode} renderContent={this.renderEpisodeData} />
    );
  }
}

export default EpisodeCard;