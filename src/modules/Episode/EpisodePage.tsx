import * as React from 'react';
import { parse } from 'query-string';
import { withRouter, RouteComponentProps } from 'react-router';
import EpisodeCard from './EpisodeCard';
// import { getEpisodeData } from '../api/gpodder';
import { HttpRequest, Episode } from '../../types/index';

interface Props {
  
}

interface State {
  episode: HttpRequest<Episode>;
}

type WithRouterProps = RouteComponentProps<Props>;

class EpisodePage extends React.Component<WithRouterProps, State> {

  constructor (props: WithRouterProps) {
    super(props);

    this.state = {
      episode: {
        type: 'fetching'
      }
    };
  }

  componentDidMount() {
    this.retrieveEpisodeData();
  }

  podcastUrl () {
    const query = parse(this.props.location.search);
    return query.podcasturl;
  }

  episodeUrl () {
    const query = parse(this.props.location.search);
    return query.episodeurl;
  }

  episodeTitle () {
    const query = parse(this.props.location.search);
    return query.episodetitle;
  }

  retrieveEpisodeData () {
    const episodeTitle = this.episodeTitle();
    const episodeUrl = this.episodeUrl();

    try {
      // const episode = await getEpisodeData(podcastUrl, episodeUrl);

      this.setState({
        episode: {
          type: 'success',
          data: {
            title: episodeTitle,
            description: '',
            published: 0,
            mediaUrl: episodeUrl
          }
        }
      });
    } catch (err) {
      this.setState({
        episode: {
          type: 'error',
          message: err.message
        }
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <section className="hero center bg-primary flex justify-center items-end">
          <EpisodeCard episode={this.state.episode} />
        </section>
        <section className="page-container pt-episodes">
          <h6 className="ml1 mb1">other stuff</h6>
        </section>
      </React.Fragment>
    );
  }
}

const EpisodePageWithRouter = withRouter<WithRouterProps>(EpisodePage);

export default (props: Props) => <EpisodePageWithRouter {...props} />;
