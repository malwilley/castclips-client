import * as React from 'react';
import { EyeOutlineIcon, StarOutlineIcon, ClockOutlineIcon, ThumbUpOutlineIcon } from 'mdi-react';
import Card from 'src/components/Card';
import { css } from 'emotion';
import { colors } from 'src/styles';
import ClipCardAccent from 'src/components/ClipCardAccent';
import formatClipLength from 'src/utils/formatClipLength';
import { ClipMetadata } from 'src/modules/clip/types';

type EpisodeClipCardProps = {
  className?: string;
  clip: ClipMetadata;
  episodeLength: number;
};

const styles = {
  description: css({
    maxHeight: 100,
    overflow: 'hidden',
  }),
  footer: css({
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
  }),
  main: css({
    height: 'auto',
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
  likeViews: css({
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
      <div className={styles.likeViews}>
        <span className={styles.iconText}>
          <ThumbUpOutlineIcon size="1.2em" />
          {clip.likesCount}
        </span>
        <span className={styles.iconText}>
          <EyeOutlineIcon size="1.2em" />
          {clip.views}
        </span>
      </div>
      <span className={styles.iconText}>
        <ClockOutlineIcon size="1.2em" />
        {formatClipLength(clip.end - clip.start)}
      </span>
    </div>
  </Card>
);

export default EpisodeClipCard;
