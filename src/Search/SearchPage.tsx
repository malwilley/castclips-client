import * as React from 'react';
import PodcastSearch from './PodcastSearch';
import './SearchPage.css';

interface Props {
}

interface State {

}

class SearchPage extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <section className="search-hero pt4 center bg-primary">
        <p className="h2 mb4 white">Share your favorite podcast moments</p>
        <PodcastSearch searchDelay={500} />
      </section>
    );
  }
}

export default SearchPage;
