import * as React from 'react';
import HttpContent from '~/components/HttpContent';
import ClipCard from '~/modules/Clip/ClipCard';
import { connect } from 'react-redux';
import { AppState } from '~/redux/types';
import { thunks } from './redux';
import { ClipState } from './types';
import InfoPage from '~/components/InfoPage';
import SectionHeader from '~/components/SectionHeader';
import { Link } from 'react-router-dom';
import { css } from 'emotion';
import { colors } from '~/styles';

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
    <InfoPage
      bodyContent={
        <>
          <SectionHeader>description</SectionHeader>
          <HttpContent
            request={clipMetadata}
            renderSuccess={({ description }) => <p>{description}</p>}
          />
        </>
      }
      featuredContent={<ClipCard clip={clipMetadata} />}
      titleContent={
        <HttpContent
          request={clipMetadata}
          renderSuccess={({ title, episode, podcast }) => (
            <>
              <SectionHeader>user clip</SectionHeader>
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
