import * as React from 'react';
import { ClipMetadata } from '~/modules/Clip/types';
import Card from '~/components/Card';
import { css } from 'emotion';
import { colors, boxShadow } from '~/styles';
import ClipCardAccent from '~/components/ClipCardAccent';
import { distanceInWords } from 'date-fns';
import fonts from '~/styles/fonts';
import { CalendarDayIcon, ClockOutlineIcon, ThumbUpOutlineIcon } from 'mdi-react';
import formatClipLength from '~/utils/formatClipLength';

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
  attributeContainer: css({
    display: 'flex',
    marginTop: 8,
  }),
  podEpSection: {
    main: css({
      backgroundColor: colors.secondary20,
    }),
    container: css({
      display: 'flex',
    }),
    thumbnail: css({
      height: 100,
      width: 100,
      flexShrink: 0,
    }),
    titlesContainer: css({
      flexGrow: 1,
      padding: '14px 20px',
    }),
    podTitle: css(fonts.heading300, {
      lineHeight: 1,
      color: colors.secondary600,
      marginBottom: 6,
    }),
    epTitle: css(fonts.heading300, {
      lineHeight: 1,
      color: colors.secondary400,
    }),
  },
};

const PodcastEpisodeSection: React.FC<HotClipProps> = ({ clip }) => (
  <div className={styles.podEpSection.main}>
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
  <Card className={styles.main} to={`/clip/${clip.id}`}>
    <PodcastEpisodeSection clip={clip} />
    <div className={styles.container}>
      <ClipCardAccent start={clip.start} end={clip.end} length={clip.episode.audioLength} />
      <h3>{clip.title}</h3>
      <div className={styles.attributeContainer}>
        <div className={fonts.attribute300}>
          <ThumbUpOutlineIcon size={14} />
          {clip.likesCount} points
        </div>
        <div className={fonts.attribute300}>
          <ClockOutlineIcon size={14} />
          {formatClipLength(clip.end - clip.start)}
        </div>
        <div className={fonts.attribute300}>
          <CalendarDayIcon size={14} />
          {distanceInWords(clip.published, Date.now())} ago
        </div>
      </div>
    </div>
  </Card>
);

export default HotClip;
