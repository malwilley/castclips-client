import { last } from 'ramda';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { getEpisodeData } from '~/api/listenNotes';
import HttpContent from '~/components/HttpContent';
import stripHtml from '~/utils/stripHtml';
import { Episode, HttpRequest } from '~/types';
import EpisodeCard from '~/modules/Episode/EpisodeCard';

interface Props {}

interface State {
  episode: HttpRequest<Episode>;
}

type WithRouterProps = RouteComponentProps<Props>;

class EpisodePage extends React.Component<WithRouterProps, State> {
  constructor(props: WithRouterProps) {
    super(props);

    this.state = {
      episode: {
        type: 'fetching',
      },
    };
  }

  componentDidMount() {
    this.retrieveEpisodeData();
  }

  retrieveEpisodeData = async () => {
    try {
      this.setState({
        episode: {
          type: 'fetching',
        },
      });
      const id = last(this.props.location.pathname.split('/'));
      if (!id) {
        throw new Error('ID not valid');
      }

      const {
        audio,
        audio_length,
        description,
        pub_date_ms,
        title,
        thumbnail,
      } = await getEpisodeData(id);

      this.setState({
        episode: {
          type: 'success',
          data: {
            audio,
            audioLength: audio_length,
            description: stripHtml(description),
            id,
            published: new Date(pub_date_ms),
            thumbnail,
            title,
          },
        },
      });
    } catch (err) {
      this.setState({
        episode: {
          type: 'error',
          message: err.message,
        },
      });
    }
  };

  render() {
    return (
      <>
        <section className="hero center bg-primary flex flex-column pt2 relative">
          <HttpContent
            renderError={() => <div>error!</div>}
            renderFetching={() => <div>fetching...</div>}
            renderSuccess={({ title }) => <h1>{title}</h1>}
            request={this.state.episode}
          />
          <EpisodeCard episode={this.state.episode} />
        </section>
        <section className="page-container pt-episodes">
          <h6 className="ml1 mb1">other stuff</h6>
        </section>
      </>
    );
  }
}

const EpisodePageWithRouter = withRouter<WithRouterProps>(EpisodePage);

export default (props: Props) => <EpisodePageWithRouter {...props} />;
