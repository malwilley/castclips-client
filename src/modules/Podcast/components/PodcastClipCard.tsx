import * as React from 'react';
import Card from 'src/components/Card';
import { css } from 'emotion';
import { ClockOutlineIcon, StarOutlineIcon, EyeOutlineIcon } from 'mdi-react';
import { colors } from 'src/styles';
import { PodcastClip } from '../types';
import formatClipLength from 'src/utils/formatClipLength';

type PodcastClipCardProps = {
  clip: PodcastClip;
};

const styles = {
  main: css({
    padding: 16,
  }),
  episode: css({
    color: colors.gray200,
  }),
  footer: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: 14,
    lineHeight: 1,
    marginTop: 12,
  }),
  textIcon: css({
    '& > :last-child': {
      marginLeft: 6,
    },
    color: colors.gray200,
    display: 'flex',
    alignItems: 'center',
  }),
  iconText: css({
    '& > :first-child': {
      marginRight: 6,
    },
    color: colors.gray200,
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

const PodcastClipCard: React.FC<PodcastClipCardProps> = ({ clip }) => (
  <Card className={styles.main} to={`/clip/${clip.id}`}>
    <h4>{clip.title}</h4>
    <h5 className={styles.episode}>{clip.episode.title}</h5>
    <div className={styles.footer}>
      <span className={styles.iconText}>
        <ClockOutlineIcon size={18} />
        <div>{formatClipLength(clip.end - clip.start)}</div>
      </span>
      <div className={styles.viewStars}>
        <span className={styles.textIcon}>
          <div>{clip.views}</div>
          <EyeOutlineIcon size={18} />
        </span>
        <span className={styles.textIcon}>
          <div>{clip.stars}</div>
          <StarOutlineIcon size={18} />
        </span>
      </div>
    </div>
  </Card>
);

export default PodcastClipCard;
