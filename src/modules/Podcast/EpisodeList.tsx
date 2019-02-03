import * as React from 'react';
import { Link } from 'react-router-dom';
import IconGoTo from '~/icons/GoTo';
import './EpisodeList.css';
import { PodcastEpisode } from './types';

type EpisodeListProps = {
  episodes: PodcastEpisode[];
};

const renderEpisode = (episode: PodcastEpisode) => {
  const { description, id, title } = episode;

  return (
    <Link to={`/episode/${id}`} key={title}>
      <div className="flex episode-row left-align items-center clickable">
        <div className="flex flex-column flex-auto p2">
          <h5 className="title flex-none overflow-ellipsis no-wrap">{title}</h5>
          <p className="h5 flex-auto overflow-ellipsis no-wrap">{description}</p>
        </div>
        <div className="flex-none p1 icon-large">
          <IconGoTo className="svg-soft" />
        </div>
      </div>
    </Link>
  );
};

const EpisodeList: React.SFC<EpisodeListProps> = ({ episodes }) => (
  <div className="slide-in">
    <h6 className="ml1 mb1">episodes</h6>
    <div className="episode-card flex flex-column align-stretch mb3">
      {episodes.map(renderEpisode)}
      <div className="episode-row flex justify-center clickable">
        <h6 className="p2">show more</h6>
      </div>
    </div>
  </div>
);

export default EpisodeList;
