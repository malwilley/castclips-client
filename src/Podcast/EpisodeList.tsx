import * as React from 'react';
import './EpisodeList.css';
import { Episode } from '../types/index';
import IconGoTo from '../icons/GoTo';
import { Link } from 'react-router-dom';

interface Props {
  episodes: Episode[];
  feedUrl: string;
}

interface State {
  numShown: number;
}

class EpisodeList extends React.Component<Props, State> {
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

  renderEpisode (episode: Episode) {
    return (
      <Link to={`/episode?podcasturl=${this.props.feedUrl}&episodeurl=${episode.mediaUrl}`}>
        <div 
          className="flex episode-row left-align items-center clickable" 
          key={episode.title}
        >
          <div className="flex flex-column flex-auto p2">
            <h5 className="title flex-none overflow-ellipsis no-wrap">{episode.title}</h5>
            <p className="h5 flex-auto overflow-ellipsis no-wrap">{episode.description}</p>
          </div>
          <div className="flex-none p1 icon-large">
            <IconGoTo className="svg-soft"/>
          </div>
        </div>
      </Link>
    );
  }

  render() {
    return (
      <div className="slide-in">
        <h6 className="ml1 mb1">episodes</h6>
        <div className="episode-card flex flex-column align-stretch mb3">
          {this.shownEpisodes().map(e => this.renderEpisode(e))}
          <div 
            className="episode-row flex justify-center clickable"
            onClick={() => this.showMoreEpisodes()} 
          >
            <h6 className="p2">show more</h6>
          </div>
        </div>
      </div>
    );
  }
}

export default EpisodeList;