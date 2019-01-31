import * as React from 'react';
import * as types from '~/types';

interface Props {
  suggestion: types.PodcastSuggestion;
}

const PodcastSuggestion: React.SFC<Props> = props => {
  return (
    <div className="flex items-center">
      <img
        src={props.suggestion.logoUrl}
        className="icon mr2 flex-none"
        height="32px"
        width="32px"
      />
      <div className="overflow-hidden">
        <h2 className="h5 m0 left-align">{props.suggestion.title}</h2>
      </div>
    </div>
  );
};

export default PodcastSuggestion;
