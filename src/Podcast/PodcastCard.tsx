import * as React from 'react';
import './PodcastCard.css';
import { HttpRequest, PodcastData } from '../types/index';

interface Props {
  podcast: HttpRequest<PodcastData>;
}

const renderSuccess = (podcast:  PodcastData) => {
  return (
    <div className="flex card down-half">
      <img 
        className="icon"
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
    <div className="down-half">
      Not asked
    </div>
  );
};

const renderLoading = () => {
  return (
    <div className="down-half">
      Loading...
    </div>
  );
};

const renderError = (message: string) => {
  return (
    <div className="down-half">
      Error! {message}
    </div>
  );
};

const PodcastCard: React.SFC<Props> = props => {
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