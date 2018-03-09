import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import PodcastCard from './PodcastCard';
// import { searchPodcasts } from '../api/podcastFeed';
import { HttpRequest, PodcastData } from '../types/index';

interface Props {
  
}

interface State {
  podcast: HttpRequest<PodcastData>;
}

type WithRouterProps = RouteComponentProps<Props>;

class PodcastPage extends React.Component<WithRouterProps, State> {

  constructor(props: WithRouterProps) {
    super(props);

    this.state = {
      podcast: {
        type: 'not_asked'
      }
    };

    console.log(this.props.location);
  }

  render() {

    return (
      <section className="hero center bg-primary flex justify-center items-end">
        <PodcastCard podcast={this.state.podcast}/>
      </section>
    );
  }
}

const PodcastPageWithRouter = withRouter<WithRouterProps>(PodcastPage);

export default (props: Props) => <PodcastPageWithRouter {...props} />;
