import * as React from 'react';
import './PodcastCard.css';

interface Props {
}

const PodcastCard: React.SFC<Props> = props => {
  return (
    <div className="card down-half">
      <div className="flex">
        <img src="" />
        <div className="flex flex-column">
          <h2>Name</h2>
          <p>slkdjfs lsdkjfsldk flksd fskdflskdjfk slkfjsdk sldf kjsdfj</p>
        </div>
      </div>
      <div>links?</div>
    </div>
  );  
};

export default PodcastCard;