import * as React from 'react';
import * as types from '../types/index';

interface Props {
  suggestion: types.PodcastSuggestion;
}

const PodcastSuggestion: React.SFC<Props> = (props) => {
  return (
    <div className="flex items-center">
      <img 
        src={props.suggestion.logoUrl}
        className="icon mr2 flex-none"
        height="32px" 
        width="32px" 
      />
      <div className="overflow-hidden">
        <h2 
          className="h5 m0 left-align"
        >
          {props.suggestion.title}
        </h2>
        <p 
          className="m0 h6 dark overflow-ellipsis left-align"
          style={{height: '16px'}}
        >
          {props.suggestion.description}
        </p>
      </div>
    </div>
  );
};

export default PodcastSuggestion;
