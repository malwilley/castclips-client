import * as React from 'react';
import HttpContent from '~/components/HttpContent';
import ClipCard from '~/modules/Clip/ClipCard';
import { connect } from 'react-redux';
import { AppState } from '~/redux/types';
import { thunks } from './redux';
import { ClipState } from './types';
import PageWithFeaturedContent from '~/components/PageWithFeaturedContent';
import SectionHeader from '~/components/SectionHeader';
import { Link } from 'react-router-dom';
import { css } from 'emotion';
import { colors } from '~/styles';
import PageTitleFetching from '~/components/PageTitleFetching';
import ClipPageBody from './components/ClipPageBody';

type ClipPageProps = {
  id: string;
};

type ClipPageConnectedProps = ClipPageProps & {
  clipMetadata: ClipState['metadata'];
  fetchClip: (id: string) => void;
};

const styles = {
  subTitle: css({
    ' > a': {
      color: colors.lightest,
      marginLeft: 4,
    },
    color: colors.secondary,
  }),
  title: css({
    marginBottom: 6,
  }),
};

const EpisodePage: React.FC<ClipPageConnectedProps> = ({ clipMetadata, fetchClip, id }) => {
  React.useEffect(() => {
    fetchClip(id);
  }, [id]);

  return (
    <PageWithFeaturedContent
      bodyContent={<ClipPageBody clipId={id} clipMetadata={clipMetadata} />}
      featuredContent={<ClipCard clip={clipMetadata} id={id} />}
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EpisodePage);
