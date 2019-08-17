import * as React from 'react';
import HttpContent from 'src/components/HttpContent';
import { PodcastState } from '../types';
import { connect } from 'react-redux';
import { AppState } from 'src/redux/types';
import PodcastClipCard from './PodcastClipCard';
import { css } from 'emotion';
import PodcastClipCardFetching from './PodcastClipCardFetching';
import PodcastClipsNoData from './PodcastClipsNoData';

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
                <PodcastClipCardFetching key={index} />
              ))}
          </>
        )}
        renderSuccess={clips =>
          clips.length > 0 ? (
            <>
              {clips.map(clip => (
                <PodcastClipCard clip={clip} key={clip.id} />
              ))}
            </>
          ) : (
            <PodcastClipsNoData />
          )
        }
      />
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  clipsRequest: state.podcast.clips,
});

export default connect(mapStateToProps)(PodcastClips);
