import * as React from 'react';
import './PodcastCard.css';
import { HttpRequest, PodcastData } from '../types/index';
import Spinner from '../Common/Spinner/Spinner';

interface Props {
  podcast: HttpRequest<PodcastData>;
}

const renderSuccess = (podcast:  PodcastData) => {
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

const renderNotAsked = () => {
  return (
    <div className="">
      Not asked
    </div>
  );
};

const renderLoading = () => {
  return (
    <div className="down-half">
      <Spinner />
    </div>
  );
};

const renderError = (message: string) => {
  return (
    <div className="flex card p2 slide-in-fifty down-half">
      Error! {message}
    </div>
  );
};

const PodcastCard  = (props: Props) => {
  switch (props.podcast.type) {
    case 'fetching':
      return renderLoading();
    case 'error':
      return renderError(props.podcast.message);
    case 'success':
      return renderSuccess(props.podcast.data);
    default:
      return renderNotAsked();
  }
};

export default PodcastCard;