import * as React from 'react';

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
      </section>
    );
  }
}

export default SearchPage;
