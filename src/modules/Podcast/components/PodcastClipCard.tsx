import * as React from 'react';
import { ClipMetadata } from '~/modules/Clip/types';
import Card from '~/components/Card';
import { css } from 'emotion';
import { Link } from 'react-router-dom';
import { ClockOutlineIcon, StarOutlineIcon, EyeOutlineIcon } from 'mdi-react';
import { colors } from '~/styles';
import { PodcastClip } from '../types';

type PodcastClipCardProps = {
  clip: PodcastClip;
};

const styles = {
  main: css({
    padding: 16,
  }),
  episode: css({
    opacity: 0.7,
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
    color: colors.gray,
    display: 'flex',
    alignItems: 'center',
  }),
  iconText: css({
    '& > :first-child': {
      marginRight: 6,
    },
    color: colors.gray,
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
  <Card className={styles.main}>
    <Link to={`/clip/${clip.id}`}>
      <h4>{clip.title}</h4>
    </Link>
    <h5 className={styles.episode}>{clip.episode.title}</h5>
    <div className={styles.footer}>
      <span className={styles.iconText}>
        <ClockOutlineIcon size={18} />
        <div>{clip.end - clip.start}s</div>
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
