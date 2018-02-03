import * as React from 'react';

interface Props {
  suggestion: string;
}

const PodcastSuggestion: React.SFC<Props> = (props) => {
  return (
    <h1>{props.suggestion}</h1>
  );
};

export default PodcastSuggestion;
