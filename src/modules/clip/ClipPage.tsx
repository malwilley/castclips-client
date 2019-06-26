import * as React from 'react';
import HttpContent from 'src/components/HttpContent';
import ClipCard from 'src/modules/clip/ClipCard';
import { connect } from 'react-redux';
import { AppState } from 'src/redux/types';
import { thunks } from './redux';
import { ClipState } from './types';
import PageWithFeaturedContent from 'src/components/PageWithFeaturedContent';
import SectionHeader from 'src/components/SectionHeader';
import { Link } from 'react-router-dom';
import { css } from 'emotion';
import { colors } from 'src/styles';
import PageTitleFetching from 'src/components/PageTitleFetching';
import ClipPageBody from './components/ClipPageBody';

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
  subTitle: css({
    ' > a': {
      color: colors.white,
      marginLeft: 4,
    },
    color: colors.secondary,
  }),
  title: css({
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
                <Link to={`/episode/${episode.id}`}>
                  <strong>{episode.title}</strong>
                </Link>{' '}
                of the podcast{' '}
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
