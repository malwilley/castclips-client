import * as React from 'react';
import HttpContent from '~/components/HttpContent';
import EpisodeCard from '~/modules/Episode/EpisodeCard';
import { EpisodeState } from './types';
import { connect } from 'react-redux';
import { AppState } from '~/redux/types';
import { thunks } from './redux';
import { css } from 'emotion';
import { colors } from '~/styles';
import SectionHeader from '~/components/SectionHeader';

type EpisodePageProps = {
  id: string;
};

type EpisodePageConnectedProps = EpisodePageProps & {
  episodeMetadata: EpisodeState['metadata'];
  fetchEpisodeMetadata: (id: string) => void;
};

const styles = {
  description: css({
    color: colors.dark,
  }),
};

class EpisodePage extends React.Component<EpisodePageConnectedProps> {
  componentDidMount() {
    const { fetchEpisodeMetadata, id } = this.props;
    fetchEpisodeMetadata(id);
  }

  render() {
    const { episodeMetadata } = this.props;
    return (
      <>
        <section className="hero center bg-primary flex flex-column pt2 relative">
          <HttpContent
            renderError={() => <div>error!</div>}
            renderFetching={() => <div>fetching...</div>}
            renderSuccess={({ title }) => <h1>{title}</h1>}
            request={episodeMetadata}
          />
          <EpisodeCard episode={episodeMetadata} />
        </section>
        <section className="page-container pt-episodes">
          <HttpContent
            request={episodeMetadata}
            renderSuccess={({ description, podcast, published }) => (
              <>
                <SectionHeader>description</SectionHeader>
                <p className={styles.description}>{description}</p>
                <p className={styles.description}>{`Published ${published.toLocaleString()}`}</p>
                <SectionHeader>clips from the episode</SectionHeader>
              </>
            )}
          />
        </section>
      </>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  episodeMetadata: state.episode.metadata,
});

const mapDispatchToProps = { fetchEpisodeMetadata: thunks.fetchEpisodeMetadata };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EpisodePage);
