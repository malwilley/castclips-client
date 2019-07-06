import * as React from 'react';
import { ClipMetadata } from 'src/modules/clip/types';
import Card from 'src/components/Card';
import { css } from 'emotion';
import { colors } from 'src/styles';
import ClipCardAccent from 'src/components/ClipCardAccent';
import fonts from 'src/styles/fonts';
import ClipCardAttributes from 'src/components/ClipCardAttributes';

type HotClipProps = {
  clip: ClipMetadata;
};

const styles = {
  main: css({
    position: 'relative',
  }),
  container: css({
    padding: 20,
  }),
  footerContainer: css({
    marginTop: 8,
  }),
  attributeContainer: css({
    display: 'flex',
    flexWrap: 'wrap',
  }),
  podEpSection: {
    accent: css({
      top: -1,
      background: 'none',
    }),
    main: css({
      borderTop: `1px solid ${colors.gray50}`,
      position: 'relative',
    }),
    container: css({
      display: 'flex',
    }),
    thumbnail: css({
      borderRadius: 4,
      height: 60,
      width: 60,
      flexShrink: 0,
      margin: 10,
    }),
    titlesContainer: css({
      flexGrow: 1,
      padding: '14px 20px 14px 0',
    }),
    podTitle: css(fonts.bold200, {
      lineHeight: 1,
      color: colors.gray700,
      marginBottom: 6,
    }),
    epTitle: css(fonts.bold200, {
      lineHeight: 1,
      color: colors.gray300,
    }),
  },
};

const PodcastEpisodeSection: React.FC<HotClipProps> = ({ clip }) => (
  <div className={styles.podEpSection.main}>
    <ClipCardAccent
      className={styles.podEpSection.accent}
      start={clip.start}
      end={clip.end}
      length={clip.episode.audioLength}
    />
    <div className={styles.podEpSection.container}>
      <img className={styles.podEpSection.thumbnail} src={clip.podcast.thumbnail} />
      <div className={styles.podEpSection.titlesContainer}>
        <div className={styles.podEpSection.podTitle}>{clip.podcast.title}</div>
        <div className={styles.podEpSection.epTitle}>{clip.episode.title}</div>
      </div>
    </div>
  </div>
);

const HotClip: React.FC<HotClipProps> = ({ clip }) => (
  <Card className={styles.main} feature to={`/clip/${clip.id}`}>
    <div className={styles.container}>
      <h3>{clip.title}</h3>
      <ClipCardAttributes className={styles.footerContainer} clip={clip} />
    </div>
    <PodcastEpisodeSection clip={clip} />
  </Card>
);

export default HotClip;
