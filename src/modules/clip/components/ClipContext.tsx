import * as React from 'react';
import SectionHeader from 'components/SectionHeader';
import Card from 'components/Card';
import { ClipMetadata } from '../types';
import formatHrMinSec from 'utils/formatHrMinSec';
import { css } from 'emotion';
import { colors, fonts, clickable, coverContainer } from 'styles';
import CalendarDayIcon from 'mdi-react/CalendarDayIcon';
import ClockOutlineIcon from 'mdi-react/ClockOutlineIcon';
import formatPublishDate from 'utils/formatPublishDate';
import ClipCardAccent from 'components/ClipCardAccent';
import { Link } from 'react-router-dom';
import { stringify } from 'querystringify';

type ClipContextProps = { clip: ClipMetadata };

const styles = {
  card: css({
    position: 'relative',
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
    lineHeight: 1,
  }),
  podcastTextContainer: css({
    '& a': {
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    padding: '16px 16px 16px 0',
  }),
  thumbnail: css({
    width: 80,
    height: 80,
    margin: 16,
    borderRadius: 8,
  }),
  titleEpisode: css(fonts.bold300, {
    marginBottom: 4,
    color: colors.gray300,
  }),
  titlePodcast: css(fonts.heading300, {
    marginBottom: 4,
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
    color: colors.gray200,
    marginRight: 10,
  }),
  link: css(clickable),
};

const ClipContext: React.FC<ClipContextProps> = ({ clip }) => (
  <div>
    <SectionHeader>from the episode</SectionHeader>
    <p className={styles.info}>
      Clip starts at{' '}
      <a
        className={styles.link}
        href={`/episode/${clip.episode.id}${stringify({ time: clip.start }, true)}`}
      >
        {formatHrMinSec(clip.start)}
      </a>{' '}
      and ends at{' '}
      <a
        className={styles.link}
        href={`/episode/${clip.episode.id}${stringify({ time: clip.end }, true)}`}
      >
        {formatHrMinSec(clip.end)}
      </a>
    </p>
    <Card className={styles.card} hover>
      <ClipCardAccent end={clip.end} length={clip.episode.audioLength} start={clip.start} />
      <div className={styles.podcastContainer}>
        <img alt="Podcast thumbnail" className={styles.thumbnail} src={clip.podcast.thumbnail} />
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
          <div className={styles.titleEpisode}>
            <Link
              className={css(coverContainer)}
              href={css(coverContainer)}
              to={`/episode/${clip.episode.id}`}
            >
              {clip.episode.title}
            </Link>
          </div>
        </div>
      </div>
    </Card>
  </div>
);

export default ClipContext;
