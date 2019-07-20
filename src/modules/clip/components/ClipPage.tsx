import * as React from 'react';
import HttpContent from 'src/components/HttpContent';
import ClipCard from 'src/modules/clip/components/ClipCard';
import { connect } from 'react-redux';
import { AppState } from 'src/redux/types';
import { thunks } from '../redux';
import { ClipState } from '../types';
import PageWithFeaturedContent from 'src/components/PageWithFeaturedContent';
import SectionHeader from 'src/components/SectionHeader';
import { Link } from 'react-router-dom';
import { css } from 'emotion';
import { colors, clickable, fonts } from 'src/styles';
import PageTitleFetching from 'src/components/PageTitleFetching';
import ClipPageBody from './ClipPageBody';
import PodcastLink from 'src/components/PodcastLink';

type ClipPageProps = {
  id: string;
};

type ClipPageConnectedProps = ClipPageProps & {
  clipMetadata: ClipState['metadata'];
  fetchClip: (id: string) => void;
  likeClip: (id: string) => void;
  unlikeClip: (id: string) => void;
};

const styles = {
  subTitle: css(fonts.bold300, {
    ' > a': {
      color: colors.white,
    },
    color: colors.secondary50,
    verticalAlign: 'middle',
  }),
  episodeLink: css({
    '&:hover': {
      textDecoration: 'underline',
    },
    display: 'inline',
    margin: '0 4px',
  }),
  title: css(fonts.heading700, {
    marginBottom: 6,
  }),
};

const ClipPage: React.FC<ClipPageConnectedProps> = ({
  clipMetadata,
  fetchClip,
  id,
  likeClip,
  unlikeClip,
}) => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
    fetchClip(id);
  }, [id]);

  return (
    <PageWithFeaturedContent
      bodyContent={<ClipPageBody clipId={id} clipMetadata={clipMetadata} />}
      featuredContent={
        <ClipCard clip={clipMetadata} id={id} likeClip={likeClip} unlikeClip={unlikeClip} />
      }
      titleContent={
        <HttpContent
          request={clipMetadata}
          renderFetching={() => (
            <>
              <SectionHeader light>user clip</SectionHeader>
              <PageTitleFetching />
            </>
          )}
          renderSuccess={({ title, episode, podcast }) => (
            <>
              <SectionHeader light>user clip</SectionHeader>
              <h1 className={styles.title}>{title}</h1>
              <h4 className={styles.subTitle}>
                From the episode{' '}
                <Link className={styles.episodeLink} to={`/episode/${episode.id}`}>
                  {episode.title}
                </Link>{' '}
                of the podcast{' '}
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
  clipMetadata: state.clip.metadata,
});

const mapDispatchToProps = {
  fetchClip: thunks.fetchClip,
  likeClip: thunks.likeClip,
  unlikeClip: thunks.unlikeClip,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClipPage);
