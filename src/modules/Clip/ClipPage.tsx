import { last } from 'ramda';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import HttpContent from '~/components/HttpContent';
import { getClip } from '~/api/firebase';
import { HttpRequest, EpisodeClip } from '~/types';
import ClipCard from './ClipCard';

type ClipPageProps = {};

type ClipPageState = {
  clip: HttpRequest<EpisodeClip>;
};

type ClipPageWithRouterProps = RouteComponentProps<ClipPageProps>;

class EpisodePage extends React.Component<ClipPageWithRouterProps, ClipPageState> {
  state = {
    clip: {
      type: 'not_asked',
    } as HttpRequest<EpisodeClip>,
  };

  componentDidMount() {
    this.retrieveEpisodeData();
  }

  retrieveEpisodeData = async () => {
    try {
      this.setState({
        clip: {
          type: 'fetching',
        },
      });
      const id = last(this.props.location.pathname.split('/'));
      if (!id) {
        throw new Error('ID not valid');
      }

      const {
        audio,
        description,
        episodeId,
        podcastId,
        start,
        end,
        title,
        stars,
        views,
      } = await getClip(id);

      this.setState({
        clip: {
          type: 'success',
          data: {
            audio,
            description,
            episodeId,
            podcastId,
            start,
            end,
            title,
            stars,
            views,
          },
        },
      });
    } catch (err) {
      this.setState({
        clip: {
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
            request={this.state.clip}
          />
          <ClipCard clip={this.state.clip} />
        </section>
        <section className="page-container pt-episodes">
          <h6 className="ml1 mb1">other stuff</h6>
        </section>
      </>
    );
  }
}

const EpisodePageWithRouter = withRouter<ClipPageWithRouterProps>(EpisodePage);

export default (props: ClipPageProps) => <EpisodePageWithRouter {...props} />;
