import * as React from 'react';
import { parse } from 'query-string';
import { withRouter, RouteComponentProps } from 'react-router';
import PodcastCard from './PodcastCard';
import { searchPodcasts } from '../api/podcastFeed';
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
        type: 'fetching'
      }
    };
    
    const query = parse(this.props.location.search);

    searchPodcasts(query.feed)
      .then(podcast => {
        this.setState({
          podcast: {
            type: 'success',
            data: podcast
          }
        });
      })
      .catch((err: Error) => {
        this.setState({
          podcast: {
            type: 'error',
            message: err.message
          }
        });
      });
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
