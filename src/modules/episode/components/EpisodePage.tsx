import * as React from 'react';
import HttpContent from 'src/components/HttpContent';
import EpisodeCard from 'src/modules/episode/components/EpisodeCard';
import { EpisodeState } from '../types';
import { connect } from 'react-redux';
import { AppState } from 'src/redux/types';
import { thunks } from '../redux';
import { css } from 'emotion';
import { colors, clickable, fonts } from 'src/styles';
import SectionHeader from 'src/components/SectionHeader';
import PageWithFeaturedContent from 'src/components/PageWithFeaturedContent';
import PageTitleFetching from 'src/components/PageTitleFetching';
import EpisodePageBody from './EpisodePageBody';
import PodcastLink from 'src/components/PodcastLink';
import { RouteComponentProps } from 'react-router';
import { parse } from 'querystringify';

type EpisodePageProps = RouteComponentProps<{ id: string }>;

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
  subTitle: css(fonts.bold300, {
    '& > a': {
      color: colors.white,
    },
    color: colors.secondary50,
  }),
  title: css(fonts.heading700, {
    marginBottom: 6,
  }),
};

const EpisodePage: React.FC<EpisodePageConnectedProps> = ({
  episodeMetadata,
  fetchEpisodeMetadata,
  match,
  location: { search },
}) => {
  const { id } = match.params;
  const { time } = parse(search) as { time?: string };

  React.useEffect(() => {
    window.scrollTo(0, 0);
    fetchEpisodeMetadata(id);
  }, [id]);

  return (
    <PageWithFeaturedContent
      bodyContent={<EpisodePageBody episodeMetadata={episodeMetadata} id={id} />}
      featuredContent={<EpisodeCard episode={episodeMetadata} time={Number(time)} />}
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
                <PodcastLink id={podcast.id} thumbnail={podcast.thumbnail} title={podcast.title} />
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
