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
import PageWithFeaturedContent from '~/components/PageWithFeaturedContent';
import { Link } from 'react-router-dom';
import ParagraphSkeleton from '~/components/ParagraphSkeleton';
import PageTitleFetching from '~/components/PageTitleFetching';

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
      marginRight: 6,
    },
    color: colors.gray600,
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
      bodyContent={
        <HttpContent
          request={episodeMetadata}
          renderFetching={() => (
            <>
              <section className={styles.section}>
                <SectionHeader>description</SectionHeader>
                <p>
                  <ParagraphSkeleton />
                </p>
              </section>
            </>
          )}
          renderSuccess={({ audioLength, description, published }) => (
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
              <SectionHeader className={styles.sectionHeader}>clips from the episode</SectionHeader>
              <EpisodeClips episodeId={id} episodeLength={audioLength} />
            </>
          )}
        />
      }
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
