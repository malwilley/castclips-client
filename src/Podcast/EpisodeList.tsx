import * as React from 'react';
import './EpisodeList.css';
import { Episode } from '../types/index';

interface Props {
  episodes: Episode[];
}

const renderEpisode = (episode: Episode) => {
  return (
    <div className="flex episode-row left-align items-center">
      <div className="flex flex-column flex-auto p2">
        <h5 className="title flex-none overflow-ellipsis no-wrap">{episode.title}</h5>
        <p className="h5 flex-auto overflow-ellipsis no-wrap">{episode.description}</p>
      </div>
      <p className="flex-none p2">i</p>
    </div>
  );
};

const PodcastCard: React.SFC<Props> = props => {
  return (
    <div className="episode-card flex flex-column align-stretch">
      {props.episodes.map(renderEpisode)}
    </div>
  );
};

export default PodcastCard;