import * as React from 'react';
import { ClipMetadata } from 'src/modules/clip/types';
import Card from 'src/components/Card';
import { css } from 'emotion';
import { colors, coverContainer } from 'src/styles';
import { range } from 'ramda';
import ClipCardAccent from 'src/components/ClipCardAccent';
import fonts from 'src/styles/fonts';
import ClipCardAttributes, { ClipCardAttributesSkeleton } from 'src/components/ClipCardAttributes';
import TextSkeleton from 'src/components/TextSkeleton';
import { Link } from 'react-router-dom';

type HotClipProps = {
  clip: ClipMetadata;
};

const styles = {
  main: css({
    position: 'relative',
    width: '100%',
  }),
  container: css({
    padding: '1rem 1.4rem 0.8rem 1.4rem',
  }),
  footerContainer: css({
    marginTop: 8,
  }),
  attributeContainer: css({
    display: 'flex',
    flexWrap: 'wrap',
  }),
  title: css(fonts.heading300),
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
      backgroundColor: colors.gray50,
      borderRadius: 4,
      height: '4rem',
      width: '4rem',
      flexShrink: 0,
      margin: '0.8rem',
    }),
    titlesContainer: css({
      flexGrow: 1,
      padding: '1rem 1rem 0.8rem 0',
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
  skeletonTitle: css({
    '& > :not(:last-child)': {
      marginBottom: 2,
    },
    marginBottom: '1rem',
  }),
};

const HotClipSkeleton: React.FC = () => (
  <Card className={styles.main} feature>
    <div className={styles.container}>
      <div className={styles.skeletonTitle}>
        {range(0, Math.ceil(Math.random() * 3)).map(i => (
          <TextSkeleton key={i} height="1rem" width={`${Math.random() * 40 + 60}%`} />
        ))}
      </div>
      <ClipCardAttributesSkeleton className={styles.footerContainer} />
    </div>
    <div className={styles.podEpSection.main}>
      <div className={styles.podEpSection.container}>
        <div className={styles.podEpSection.thumbnail} />
        <div className={styles.podEpSection.titlesContainer}>
          <div className={styles.podEpSection.podTitle}>
            <TextSkeleton height="0.8rem" width={200} />
          </div>
          <div className={styles.podEpSection.epTitle}>
            <TextSkeleton height="0.8rem" width={200} />
          </div>
        </div>
      </div>
    </div>
  </Card>
);

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
  <Card className={styles.main} feature hover>
    <div className={styles.container}>
      <Link className={css(coverContainer)} to={`/clip/${clip.id}`}>
        <h3 className={styles.title}>{clip.title}</h3>
      </Link>
      <ClipCardAttributes className={styles.footerContainer} clip={clip} />
    </div>
    <PodcastEpisodeSection clip={clip} />
  </Card>
);

export { HotClipSkeleton };
export default HotClip;
