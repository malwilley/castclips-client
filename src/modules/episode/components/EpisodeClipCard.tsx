import * as React from 'react';
import Card from 'src/components/Card';
import { css } from 'emotion';
import { fonts, colors, coverContainer } from 'src/styles';
import ClipCardAccent from 'src/components/ClipCardAccent';
import { ClipMetadata } from 'src/modules/clip/types';
import ClipCardAttributes from 'src/components/ClipCardAttributes';
import TruncateContent from 'src/components/TruncateContent';
import { Link } from 'react-router-dom';

type EpisodeClipCardProps = {
  className?: string;
  clip: ClipMetadata;
  episodeLength: number;
};

const styles = {
  description: css(fonts.text200, {
    color: colors.gray300,
    whiteSpace: 'pre-wrap',
  }),
  descriptionContainer: css({
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
  <Card className={css(styles.main, className)} hover>
    <ClipCardAccent end={clip.end} length={episodeLength} start={clip.start} />
    <Link className={css(coverContainer)} to={`/clip/${clip.id}`}>
      <h3 className={styles.title}>{clip.title}</h3>
    </Link>
    <TruncateContent className={styles.descriptionContainer} maxHeight={50}>
      <div className={styles.description}>{clip.description}</div>
    </TruncateContent>
    <ClipCardAttributes clip={clip} />
  </Card>
);

export default EpisodeClipCard;
