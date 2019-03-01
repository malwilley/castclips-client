import * as React from 'react';
import HttpContent from '~/components/HttpContent';
import { PodcastState } from '../types';
import { connect } from 'react-redux';
import { AppState } from '~/redux/types';
import PodcastClipCard from './PodcastClipCard';
import { css } from 'emotion';
import PodcastClipCardFetching from './PodcastClipCardFetching';

type PodcastClipsConnectedProps = {
  clipsRequest: PodcastState['clips'];
};

const styles = {
  main: css({
    '& > :not(:last-child)': {
      marginBottom: 18,
    },
  }),
};

const PodcastClips: React.FC<PodcastClipsConnectedProps> = ({ clipsRequest }) => {
  return (
    <div className={styles.main}>
      <HttpContent
        request={clipsRequest}
        renderFetching={() => (
          <>
            {Array(3)
              .fill(0)
              .map((_, index) => (
                <PodcastClipCardFetching />
              ))}
          </>
        )}
        renderSuccess={clips => (
          <>
            {clips.map(clip => (
              <PodcastClipCard clip={clip} key={clip.id} />
            ))}
          </>
        )}
      />
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  clipsRequest: state.podcast.clips,
});

export default connect(mapStateToProps)(PodcastClips);
