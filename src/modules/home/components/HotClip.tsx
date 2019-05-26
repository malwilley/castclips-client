import * as React from 'react';
import { ClipMetadata } from '~/modules/Clip/types';
import Card from '~/components/Card';
import { css } from 'emotion';
import { colors } from '~/styles';
import ClipCardAccent from '~/components/ClipCardAccent';
import { distanceInWords } from 'date-fns';

type HotClipProps = {
  clip: ClipMetadata;
};

const styles = {
  main: css({
    position: 'relative',
  }),
  container: css({
    padding: 20,
    position: 'relative',
  }),
  podEpSection: {
    main: css({
      backgroundColor: colors.secondary20,
      padding: 20,
    }),
    container: css({
      display: 'flex',
    }),
    thumbnail: css({
      height: 50,
      width: 50,
      borderRadius: 8,
      flexShrink: 0,
      marginRight: 20,
    }),
    titlesContainer: css({
      flexGrow: 1,
    }),
  },
};

const PodcastEpisodeSection: React.FC<HotClipProps> = ({ clip }) => (
  <div className={styles.podEpSection.main}>
    <div className={styles.podEpSection.container}>
      <img className={styles.podEpSection.thumbnail} src={clip.podcast.thumbnail} />
      <div className={styles.podEpSection.titlesContainer}>
        <h4>{clip.podcast.title}</h4>
        <h4>{clip.episode.title}</h4>
      </div>
    </div>
  </div>
);

const HotClip: React.FC<HotClipProps> = ({ clip }) => (
  <Card className={styles.main}>
    <PodcastEpisodeSection clip={clip} />
    <div className={styles.container}>
      <ClipCardAccent start={clip.start} end={clip.end} length={clip.episode.audioLength} />
      <h3>{clip.title}</h3>
      <h4>Created {distanceInWords(clip.published, Date.now())} ago</h4>
    </div>
  </Card>
);

export default HotClip;
