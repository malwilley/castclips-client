import * as React from 'react';
import {
  EyeOutlineIcon,
  StarOutlineIcon,
  ClockOutlineIcon,
  ThumbUpOutlineIcon,
  HeartIcon,
  CalendarDayIcon,
} from 'mdi-react';
import Card from 'src/components/Card';
import { css } from 'emotion';
import { colors, fonts } from 'src/styles';
import ClipCardAccent from 'src/components/ClipCardAccent';
import formatClipLength from 'src/utils/formatClipLength';
import { ClipMetadata } from 'src/modules/clip/types';
import Timestamp from 'src/components/Timestamp';
import formatPublishDate from 'src/utils/formatPublishDate';
import formatClipAge from 'src/utils/formatClipAge';

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
  iconText: css(fonts.attribute300),
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
          <HeartIcon />
          {clip.likesCount}
        </span>
        <span className={styles.iconText}>
          <CalendarDayIcon />
          {formatClipAge(clip.published)}
        </span>
      </div>
      <Timestamp seconds={clip.end - clip.start} />
    </div>
  </Card>
);

export default EpisodeClipCard;
