import * as React from 'react';
import Card from 'src/components/Card';
import { css } from 'emotion';
import { fonts, colors } from 'src/styles';
import ClipCardAccent from 'src/components/ClipCardAccent';
import { ClipMetadata } from 'src/modules/clip/types';
import ClipCardAttributes from 'src/components/ClipCardAttributes';

type EpisodeClipCardProps = {
  className?: string;
  clip: ClipMetadata;
  episodeLength: number;
};

const styles = {
  description: css(fonts.text200, {
    maxHeight: 100,
    overflow: 'hidden',
    color: colors.gray300,
    margin: '0.8em 0',
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
  title: css(fonts.heading300, {
    color: colors.gray700,
  }),
};

const EpisodeClipCard: React.SFC<EpisodeClipCardProps> = ({ className, clip, episodeLength }) => (
  <Card className={css(styles.main, className)} to={`/clip/${clip.id}`}>
    <ClipCardAccent end={clip.end} length={episodeLength} start={clip.start} />
    <h3 className={styles.title}>{clip.title}</h3>
    <p className={styles.description}>{clip.description}</p>
    <ClipCardAttributes clip={clip} />
  </Card>
);

export default EpisodeClipCard;
