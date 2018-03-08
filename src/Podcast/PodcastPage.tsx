import * as React from 'react';

interface Props {
}

interface State {

}

class PodcastPage extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <section className="hero pt4 center bg-primary">
        <h1>Podcast Name</h1>
      </section>
    );
  }
}

export default PodcastPage;
