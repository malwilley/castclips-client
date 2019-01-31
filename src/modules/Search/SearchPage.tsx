import * as React from 'react';
import PodcastSearch from '~/modules/Search/PodcastSearch';

interface Props {}

interface State {}

class SearchPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <section className="hero-large pt4 center bg-primary">
        <p className="h1 mb4 white">Share your favorite podcast moments</p>
        <PodcastSearch searchDelay={500} />
      </section>
    );
  }
}

export default SearchPage;
