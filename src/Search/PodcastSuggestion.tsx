import * as React from 'react';
import * as types from '../types/index';

interface Props {
  suggestion: types.PodcastSuggestion;
}

const PodcastSuggestion: React.SFC<Props> = (props) => {
  return (
    <a>
      <h2>{props.suggestion.title}</h2>
      <p>{props.suggestion.description}</p>
    </a>
  );
};

export default PodcastSuggestion;
