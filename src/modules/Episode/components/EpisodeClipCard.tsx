import * as React from 'react';
import { ClipMetadata } from '~/modules/Clip/types';
import { EyeOutlineIcon, StarOutlineIcon, ClockOutlineIcon } from 'mdi-react';
import Card from '~/components/Card';
import { css } from 'emotion';
import { colors } from '~/styles';
import { Link } from 'react-router-dom';

type EpisodeClipCardProps = {
  className?: string;
  clip: ClipMetadata & { id: string };
  episodeLength: number;
};

const styles = {
  accent: css({
    backgroundColor: colors.light,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
  }),
  accentClipSection: css({
    backgroundColor: colors.tertiary,
    position: 'absolute',
    height: '100%',
  }),
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

const EpisodeClipCard: React.SFC<EpisodeClipCardProps> = ({ className, clip, episodeLength }) => (
  <Link to={`/clip/${clip.id}`}>
    <Card className={css(styles.main, className)}>
      <div className={styles.accent}>
        <div
          className={styles.accentClipSection}
          style={{
            left: `${(clip.start / episodeLength) * 100}%`,
            width: `${((clip.end - clip.start) / episodeLength) * 100}%`,
          }}
        />
      </div>
      <h3>{clip.title}</h3>
      <p className={styles.description}>{clip.description}</p>
      <div className={styles.footer}>
        <span className={styles.iconText}>
          <ClockOutlineIcon size={20} />
          {clip.end - clip.start}s
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
  </Link>
);

export default EpisodeClipCard;
