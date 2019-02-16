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
import EpisodeClips from './components/EpisodeClips';
import { CalendarClockIcon } from 'mdi-react';
import InfoPage from '~/components/InfoPage';
import { Link } from 'react-router-dom';

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
    maxHeight: 180,
    overflow: 'hidden',
  }),
  published: css({
    '& > svg': {
      fill: colors.dark,
      marginRight: 6,
    },
    color: colors.dark,
    display: 'flex',
    alignItems: 'center',
  }),
  section: css({
    marginBottom: 50,
  }),
  sectionHeader: css({
    marginBottom: 30,
  }),
  subTitle: css({
    ' > a': {
      color: colors.lightest,
    },
    color: colors.secondary,
  }),
  title: css({
    marginBottom: 6,
  }),
};

class EpisodePage extends React.Component<EpisodePageConnectedProps> {
  componentDidMount() {
    const { fetchEpisodeMetadata, id } = this.props;
    fetchEpisodeMetadata(id);
  }

  render() {
    const { episodeMetadata, id } = this.props;
    return (
      <InfoPage
        bodyContent={
          <HttpContent
            request={episodeMetadata}
            renderSuccess={({ audioLength, description, podcast, published }) => (
              <>
                <section className={styles.section}>
                  <SectionHeader>description</SectionHeader>
                  <div
                    className={styles.description}
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                  <p className={styles.published}>
                    <CalendarClockIcon size={20} /> {`Published ${published.toLocaleString()}`}
                  </p>
                </section>
                <SectionHeader className={styles.sectionHeader}>
                  clips from the episode
                </SectionHeader>
                <EpisodeClips episodeId={id} episodeLength={audioLength} />
              </>
            )}
          />
        }
        featuredContent={<EpisodeCard episode={episodeMetadata} />}
        titleContent={
          <>
            <SectionHeader>Episode</SectionHeader>
            <h1 className={styles.title}>
              {episodeMetadata.type === 'success' ? episodeMetadata.data.title : ''}
            </h1>
            {episodeMetadata.type === 'success' ? (
              <h4 className={styles.subTitle}>
                From the podcast{' '}
                <Link to={`/podcast/${episodeMetadata.data.podcast.id}`}>
                  <strong>{episodeMetadata.data.podcast.title}</strong>
                </Link>
              </h4>
            ) : (
              <p />
            )}
          </>
        }
      />
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
