import * as React from 'react';
import PodcastSearch from '~/modules/Search/PodcastSearch';
import Header from '~/modules/header';

const SearchPage: React.FC = () => (
  <>
    <Header />
    <section className="hero-large pt4 center bg-primary">
      <p className="h1 mb4 white">Share your favorite podcast moments</p>
      <PodcastSearch searchDelay={500} />
    </section>
  </>
);

export default SearchPage;
