import * as React from 'react';
import PodcastCard from './PodcastCard';

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
      <section className="hero center bg-primary flex justify-center items-end">
        <PodcastCard />
      </section>
    );
  }
}

export default PodcastPage;
