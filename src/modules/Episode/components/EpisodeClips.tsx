import * as React from 'react';
import { connect } from 'react-redux';
import { thunks } from '../redux';
import { AppState } from '~/redux/types';
import { EpisodeState } from '../types';
import HttpContent from '~/components/HttpContent';
import EpisodeClipCard from './EpisodeClipCard';
import { css } from 'emotion';
import NoData from '~/components/NoData';

type EpisodeClipsProps = {
  episodeId: string;
  episodeLength: number;
};

type EpisodeClipsConnectedProps = EpisodeClipsProps & {
  clipsState: EpisodeState['clips'];
  fetchClips: (id: string) => void;
};

const styles = {
  container: css({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridColumnGap: 20,
    gridRowGap: 20,
  }),
};

const EpisodeClips: React.SFC<EpisodeClipsConnectedProps> = ({
  clipsState,
  episodeId,
  episodeLength,
  fetchClips,
}) => {
  React.useEffect(() => {
    fetchClips(episodeId);
  }, [episodeId]);

  return (
    <HttpContent
      request={clipsState}
      renderFetching={() => null}
      renderSuccess={clips =>
        clips.length > 0 ? (
          <div className={styles.container}>
            {clips.map(clip => (
              <EpisodeClipCard clip={clip} key={clip.id} episodeLength={episodeLength} />
            ))}
          </div>
        ) : (
          <NoData message="No one has made any clips for the episode yet. Be the first!" />
        )
      }
    />
  );
};

const mapDispatchToProps = {
  fetchClips: thunks.fetchClips,
};

const mapStateToProps = (state: AppState) => ({
  clipsState: state.episode.clips,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EpisodeClips);
