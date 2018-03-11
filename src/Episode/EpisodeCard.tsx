import * as React from 'react';
import './EpisodeCard.css';
import { HttpRequest, Episode } from '../types/index';
import FeatureCard from '../Common/FeatureCard/FeatureCard';

interface Props {
  episode: HttpRequest<Episode>;
}

const renderEpisodeData = (episode:  Episode) => {
  return (
    <div className="flex card down-half slide-in-fifty">
      <div className="flex flex-column flex-auto left-align px3 py1">
        <h3 className="flex-none">{episode.title}</h3>
        <p className="flex-auto overflow-ellipsis m0">{episode.description}</p>
        <audio src={episode.mediaUrl} controls={true} />
      </div>
    </div>
  );
};

const EpisodeCard  = (props: Props) => {
  return (
    <FeatureCard content={props.episode} renderContent={renderEpisodeData} />
  );
};

export default EpisodeCard;