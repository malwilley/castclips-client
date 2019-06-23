import * as React from 'react';
import { ClipMetadata } from 'src/modules/clip/types';
import Card from 'src/components/Card';
import { css } from 'emotion';
import { colors } from 'src/styles';
import ClipCardAccent from 'src/components/ClipCardAccent';
import distanceInWords from 'date-fns/distance_in_words';
import fonts from 'src/styles/fonts';
import { CalendarDayIcon, ThumbUpOutlineIcon, HeartIcon } from 'mdi-react';
import Timestamp from 'src/components/Timestamp';
import formatClipAge from 'src/utils/formatClipAge';

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
  footerContainer: css({
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 8,
  }),
  attributeContainer: css({
    display: 'flex',
    flexWrap: 'wrap',
  }),
  podEpSection: {
    main: css({
      borderTop: `1px solid ${colors.gray50}`,
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
    podTitle: css(fonts.heading200, {
      lineHeight: 1,
      color: colors.gray700,
      marginBottom: 6,
    }),
    epTitle: css(fonts.heading200, {
      lineHeight: 1,
      color: colors.gray300,
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
  <Card className={styles.main} feature to={`/clip/${clip.id}`}>
    <div className={styles.container}>
      <ClipCardAccent start={clip.start} end={clip.end} length={clip.episode.audioLength} />
      <h3>{clip.title}</h3>
      <div className={styles.footerContainer}>
        <div className={styles.attributeContainer}>
          <div className={fonts.attribute300}>
            <HeartIcon size={14} />
            {clip.likesCount}
          </div>
          <div className={fonts.attribute300}>
            <CalendarDayIcon size={14} />
            {formatClipAge(clip.published)}
          </div>
        </div>
        <Timestamp seconds={clip.end - clip.start} />
      </div>
    </div>
    <PodcastEpisodeSection clip={clip} />
  </Card>
);

export default HotClip;
