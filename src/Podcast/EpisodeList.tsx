import * as React from 'react';
import './EpisodeList.css';
import { Episode } from '../types/index';

interface Props {
  episodes: Episode[];
}

interface State {
  numShown: number;
}

const renderEpisode = (episode: Episode) => {
  return (
    <div className="flex episode-row left-align items-center" key={episode.title}>
      <div className="flex flex-column flex-auto p2">
        <h5 className="title flex-none overflow-ellipsis no-wrap">{episode.title}</h5>
        <p className="h5 flex-auto overflow-ellipsis no-wrap">{episode.description}</p>
      </div>
      <p className="flex-none p2">i</p>
    </div>
  );
};

class PodcastCard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      numShown: 20
    };
  }

  shownEpisodes() {
    return this.props.episodes.slice(0, this.state.numShown);
  }

  showMoreEpisodes() {
    this.setState({
      numShown: this.state.numShown + 20
    });
  }

  render() {
    return (
      <div className="episode-card flex flex-column align-stretch slide-in mb3">
        {this.shownEpisodes().map(renderEpisode)}
        <div 
          className="episode-row flex justify-center clickable"
          onClick={() => this.showMoreEpisodes()} 
        >
          <h6 className="p2">show more</h6>
        </div>
      </div>
    );
  }
}

export default PodcastCard;