import * as React from 'react';
import SectionHeader from '~/components/SectionHeader';
import Card from '~/components/Card';
import { ClipMetadata } from '../types';
import formatHrMinSec from '~/utils/formatHrMinSec';
import { css } from 'emotion';
import { colors } from '~/styles';
import stripHtml from '~/utils/stripHtml';
import { CalendarDayIcon, ClockOutlineIcon } from 'mdi-react';
import formatPublishDate from '~/utils/formatPublishDate';
import ClipCardAccent from '~/components/ClipCardAccent';

type ClipContextProps = { clip: ClipMetadata };

const styles = {
  card: css({
    position: 'relative',
  }),
  descriptionEpisode: css({
    maxHeight: 24,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    fontSize: 14,
    color: colors.gray700,
  }),
  episodeTags: css({
    display: 'flex',
    alignItems: 'center',
    marginBottom: 4,
  }),
  info: css({
    '& > a': {
      textDecoration: 'underline',
      fontWeight: 'bold',
    },
    margin: '20px 0',
  }),
  podcastContainer: css({
    alignItems: 'flex-start',
    display: 'flex',
  }),
  podcastTextContainer: css({
    padding: '16px 16px 16px 0',
    overflow: 'hidden',
  }),
  thumbnail: css({
    width: 80,
    height: 80,
    margin: 16,
    borderRadius: 8,
  }),
  titleEpisode: css({
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.dark,
    lineHeight: 1,
    marginBottom: 4,
  }),
  titlePodcast: css({
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.dark,
    lineHeight: 1,
    marginBottom: 2,
  }),
  textIcon: css({
    '& > svg': {
      marginRight: 6,
    },
    display: 'flex',
    alignItems: 'center',
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: colors.gray700,
    marginRight: 10,
  }),
};

const ClipContext: React.FC<ClipContextProps> = ({ clip }) => (
  <div>
    <SectionHeader>from the episode</SectionHeader>
    <p className={styles.info}>
      Clip starts at <a href="">{formatHrMinSec(clip.start)}</a> and ends at{' '}
      <a href="">{formatHrMinSec(clip.end)}</a>
    </p>
    <Card className={styles.card}>
      <ClipCardAccent end={clip.end} length={clip.episode.audioLength} start={clip.start} />
      <div className={styles.podcastContainer}>
        <img className={styles.thumbnail} src={clip.podcast.thumbnail} />
        <div className={styles.podcastTextContainer}>
          <div className={styles.episodeTags}>
            <div className={styles.textIcon}>
              <CalendarDayIcon size={14} />
              <div>{formatPublishDate(clip.episode.published)}</div>
            </div>
            <div className={styles.textIcon}>
              <ClockOutlineIcon size={14} />
              <div>{(clip.episode.audioLength / 60).toFixed(0)} min</div>
            </div>
          </div>
          <div className={styles.titlePodcast}>{clip.podcast.title}</div>
          <div className={styles.titleEpisode}>{clip.episode.title}</div>
          <div className={styles.descriptionEpisode}>{stripHtml(clip.episode.description)}</div>
        </div>
      </div>
    </Card>
  </div>
);

export default ClipContext;
