import * as React from 'react';
import './PodcastCard.css';
import { HttpRequest, PodcastData } from '../types/index';

interface Props {
  podcast: HttpRequest<PodcastData>;
}

const renderSuccess = (podcast:  PodcastData) => {
  return (
    <div className="card down-half">
      <div className="flex">
        <img src="" />
        <div className="flex flex-column">
          <h2>{podcast.title}</h2>
          <p>{podcast.description}</p>
        </div>
      </div>
      <div>links? {podcast.link}</div>
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