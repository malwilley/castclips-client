import * as React from 'react';
import { parse } from 'query-string';
import { withRouter, RouteComponentProps } from 'react-router';
import PodcastCard from './PodcastCard';
import EpisodeList from './EpisodeList';
import { parseFeed } from '~/api/podcastFeed';
import { HttpRequest, PodcastData } from '~/types/index';
import './PodcastPage.css';

interface Props {
  
}

interface State {
  podcast: HttpRequest<PodcastData>;
}

type WithRouterProps = RouteComponentProps<Props>;

class PodcastPage extends React.Component<WithRouterProps, State> {

  constructor (props: WithRouterProps) {
    super(props);

    this.state = {
      podcast: {
        type: 'fetching'
      }
    };
  }

  componentDidMount() {
    this.retrieveEpisodes();
  }

  feedUrl () {
    const query = parse(this.props.location.search);
    return query.feed;
  }

  async retrieveEpisodes () {
    const feedUrl = this.feedUrl();

    try {
      const podcast = await parseFeed(feedUrl);

      await this.setState({
        podcast: {
          type: 'success',
          data: podcast
        }
      });
    } catch (err) {
      await this.setState({
        podcast: {
          type: 'error',
          message: err.message
        }
      });
    }
  }

  render() {

    const episodes = this.state.podcast.type === 'success'
      ? <EpisodeList feedUrl={this.feedUrl()} episodes={this.state.podcast.data.episodes} /> 
      : null;

    return (
      <React.Fragment>
        <section className="hero center bg-primary flex justify-center items-end">
          <PodcastCard podcast={this.state.podcast}/>
        </section>
        <section className="page-container pt-episodes">
          {episodes}
        </section>
      </React.Fragment>
    );
  }
}

const PodcastPageWithRouter = withRouter<WithRouterProps>(PodcastPage);

export default (props: Props) => <PodcastPageWithRouter {...props} />;
