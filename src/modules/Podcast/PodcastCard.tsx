import * as React from 'react';
import './PodcastCard.css';
import { HttpRequest, PodcastData } from '~/types/index';
import FeatureCard from '~/components/FeatureCard/FeatureCard';

interface Props {
  podcast: HttpRequest<PodcastData>;
}

const renderPodcastData = (podcast:  PodcastData) => {
  return (
    <div className="flex card down-half slide-in-fifty">
      <img 
        className="icon podcast-img"
        src="http://static.libsyn.com/p/assets/6/d/7/d/6d7d36d6929db515/MBMBAM_Update.jpg" 
      />
      <div className="flex flex-column flex-auto left-align px3 py1">
        <h3 className="flex-none">{podcast.title}</h3>
        <p className="flex-auto overflow-ellipsis m0">{podcast.description}</p>
        <p className="flex-none m0">links? {podcast.link}</p>
      </div>
    </div>
  );
};

const PodcastCard  = (props: Props) => {
  return (
    <FeatureCard content={props.podcast} renderContent={renderPodcastData} />
  );
};

export default PodcastCard;