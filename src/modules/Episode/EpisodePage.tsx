import * as React from 'react';
import HttpContent from 'src/components/HttpContent';
import EpisodeCard from 'src/modules/Episode/EpisodeCard';
import { EpisodeState } from './types';
import { connect } from 'react-redux';
import { AppState } from 'src/redux/types';
import { thunks } from './redux';
import { css } from 'emotion';
import { colors } from 'src/styles';
import SectionHeader from 'src/components/SectionHeader';
import EpisodeClips from './components/EpisodeClips';
import { CalendarClockIcon } from 'mdi-react';
import PageWithFeaturedContent from 'src/components/PageWithFeaturedContent';
import { Link } from 'react-router-dom';
import ParagraphSkeleton from 'src/components/ParagraphSkeleton';
import PageTitleFetching from 'src/components/PageTitleFetching';
import formatPublishDate from 'src/utils/formatPublishDate';
import EpisodePageBody from './components/EpisodePageBody';

type EpisodePageProps = {
  id: string;
};

type EpisodePageConnectedProps = EpisodePageProps & {
  episodeMetadata: EpisodeState['metadata'];
  fetchEpisodeMetadata: (id: string) => void;
};

const styles = {
  description: css({
    color: colors.gray600,
    maxHeight: 180,
    overflow: 'hidden',
  }),
  published: css({
    '& > svg': {
      fill: colors.gray600,
      marginRight: 8,
    },
    color: colors.gray500,
    display: 'flex',
    alignItems: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontSize: 12,
    fontWeight: 'bold',
    margin: '20px 0 0 0',
  }),
  section: css({
    marginBottom: 50,
  }),
  sectionHeader: css({
    marginBottom: 30,
  }),
  subTitle: css({
    '& > a': {
      color: colors.lightest,
      marginLeft: 4,
    },
    color: colors.secondary,
  }),
  title: css({
    marginBottom: 6,
  }),
};

const EpisodePage: React.FC<EpisodePageConnectedProps> = ({
  episodeMetadata,
  fetchEpisodeMetadata,
  id,
}) => {
  React.useEffect(() => {
    fetchEpisodeMetadata(id);
  }, [id]);

  return (
    <PageWithFeaturedContent
      bodyContent={<EpisodePageBody episodeMetadata={episodeMetadata} id={id} />}
      featuredContent={<EpisodeCard episode={episodeMetadata} />}
      titleContent={
        <HttpContent
          request={episodeMetadata}
          renderFetching={() => (
            <>
              <SectionHeader light>episode</SectionHeader>
              <PageTitleFetching />
            </>
          )}
          renderSuccess={({ title, podcast }) => (
            <>
              <SectionHeader light>episode</SectionHeader>
              <h1 className={styles.title}>{title}</h1>
              <h4 className={styles.subTitle}>
                From the podcast{' '}
                <Link to={`/podcast/${podcast.id}`}>
                  <strong>{podcast.title}</strong>
                </Link>
              </h4>
            </>
          )}
        />
      }
    />
  );
};

const mapStateToProps = (state: AppState) => ({
  episodeMetadata: state.episode.metadata,
});

const mapDispatchToProps = { fetchEpisodeMetadata: thunks.fetchEpisodeMetadata };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EpisodePage);
