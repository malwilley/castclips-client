import * as React from 'react';
import { EyeOutlineIcon, StarOutlineIcon, ClockOutlineIcon } from 'mdi-react';
import Card from 'src/components/Card';
import { css } from 'emotion';
import { colors } from 'src/styles';
import { Link } from 'react-router-dom';
import { EpisodeClip } from '../types';
import ClipCardAccent from 'src/components/ClipCardAccent';
import formatClipLength from 'src/utils/formatClipLength';

type EpisodeClipCardProps = {
  className?: string;
  clip: EpisodeClip;
  episodeLength: number;
};

const styles = {
  description: css({
    height: 100,
    overflow: 'hidden',
  }),
  footer: css({
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
  }),
  main: css({
    height: 220,
    padding: 20,
    position: 'relative',
  }),
  textIcon: css({
    '& > :last-child': {
      marginLeft: 6,
    },
    color: colors.gray100,
    display: 'flex',
    alignItems: 'center',
  }),
  iconText: css({
    '& > :first-child': {
      marginRight: 6,
    },
    color: colors.gray100,
    display: 'flex',
    alignItems: 'center',
  }),
  viewStars: css({
    '> :not(:last-child)': {
      marginRight: 16,
    },
    display: 'flex',
  }),
};

const EpisodeClipCard: React.SFC<EpisodeClipCardProps> = ({ className, clip, episodeLength }) => (
  <Card className={css(styles.main, className)} to={`/clip/${clip.id}`}>
    <ClipCardAccent end={clip.end} length={episodeLength} start={clip.start} />
    <h3>{clip.title}</h3>
    <p className={styles.description}>{clip.description}</p>
    <div className={styles.footer}>
      <span className={styles.iconText}>
        <ClockOutlineIcon size={20} />
        {formatClipLength(clip.end - clip.start)}
      </span>
      <div className={styles.viewStars}>
        <span className={styles.textIcon}>
          {clip.views}
          <EyeOutlineIcon size={20} />
        </span>
        <span className={styles.textIcon}>
          {clip.stars}
          <StarOutlineIcon size={20} />
        </span>
      </div>
    </div>
  </Card>
);

export default EpisodeClipCard;
