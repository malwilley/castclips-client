import * as React from 'react';
import FeatureCard from '~/components/FeatureCard/FeatureCard';
import { HttpRequest, PodcastData } from '~/types';
import './PodcastCard.css';
import { PodcastMetadata } from './types';

interface Props {
  podcast: HttpRequest<PodcastMetadata>;
}

const renderPodcastData = ({ description, thumbnail, title, website }: PodcastData) => {
  return (
    <div className="flex card down-half slide-in-fifty">
      <img className="icon podcast-img" src={thumbnail} />
      <div className="flex flex-column flex-auto left-align px3 py1">
        <h3 className="flex-none">{title}</h3>
        <p className="flex-auto overflow-ellipsis m0">{description}</p>
        <p className="flex-none m0">links? {website}</p>
      </div>
    </div>
  );
};

const PodcastCard = (props: Props) => {
  return <FeatureCard content={props.podcast} renderContent={renderPodcastData} />;
};

export default PodcastCard;
