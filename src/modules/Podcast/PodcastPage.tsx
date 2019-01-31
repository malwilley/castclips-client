import { last } from 'ramda';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { getPodcastData } from '~/api/listenNotes';
import { HttpRequest, PodcastData } from '~/types';
import stripHtml from '~/utils/stripHtml';
import EpisodeList from '~/modules/Podcast/EpisodeList';
import PodcastCard from '~/modules/Podcast/PodcastCard';
import './PodcastPage.css';

interface PodcastPageProps {}

interface PodcastPageState {
  podcast: HttpRequest<PodcastData>;
}

type WithRouterProps = RouteComponentProps<PodcastPageProps>;

class PodcastPage extends React.Component<WithRouterProps, PodcastPageState> {
  constructor(props: WithRouterProps) {
    super(props);

    this.state = {
      podcast: {
        type: 'fetching',
      },
    };
  }

  componentDidMount() {
    this.retrieveEpisodes();
  }

  async retrieveEpisodes() {
    try {
      const id = last(this.props.location.pathname.split('/'));
      if (!id) {
        throw new Error('ID not valid');
      }

      const { description, episodes, thumbnail, title, website } = await getPodcastData(id);

      await this.setState({
        podcast: {
          type: 'success',
          data: {
            description: stripHtml(description),
            episodes: episodes.map(
              ({
                audio,
                audio_length,
                description: episodeDescription,
                id: episodeId,
                pub_date_ms,
                thumbnail: episodeThumbnail,
              }) => ({
                audio,
                audioLength: audio_length,
                description: stripHtml(episodeDescription),
                id: episodeId,
                published: new Date(pub_date_ms),
                thumbnail: episodeThumbnail,
                title,
              })
            ),
            id,
            thumbnail,
            title,
            website,
          },
        },
      });
    } catch (err) {
      console.log(err);
      await this.setState({
        podcast: {
          type: 'error',
          message: err.message,
        },
      });
    }
  }

  render() {
    const episodes =
      this.state.podcast.type === 'success' ? (
        <EpisodeList episodes={this.state.podcast.data.episodes} />
      ) : null;

    return (
      <React.Fragment>
        <section className="hero center bg-primary flex flex-column pt2 relative">
          <h1>Podcast</h1>
          <PodcastCard podcast={this.state.podcast} />
        </section>
        <section className="page-container pt-episodes">{episodes}</section>
      </React.Fragment>
    );
  }
}

const PodcastPageWithRouter = withRouter<WithRouterProps>(PodcastPage);

export default (props: PodcastPageProps) => <PodcastPageWithRouter {...props} />;
