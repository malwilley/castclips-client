import * as React from 'react';
import Card from 'src/components/Card';
import { css } from 'emotion';
import { colors, fonts, coverContainer } from 'src/styles';
import { ClipMetadata } from 'src/modules/clip/types';
import ClipCardAttributes from 'src/components/ClipCardAttributes';
import ClipCardAccent from 'src/components/ClipCardAccent';
import { Link } from 'react-router-dom';

type PodcastClipCardProps = {
  clip: ClipMetadata;
};

const styles = {
  main: css({
    padding: 16,
  }),
  footer: css({
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
  iconText: css(fonts.attribute300),
  title: css(fonts.heading300, {
    marginBottom: 4,
  }),
  episode: css(fonts.bold200, {
    color: colors.gray200,
  }),
  viewStars: css({
    '> :not(:last-child)': {
      marginRight: 16,
    },
    display: 'flex',
  }),
};

const PodcastClipCard: React.FC<PodcastClipCardProps> = ({ clip }) => (
  <Card className={styles.main} hover>
    <ClipCardAccent start={clip.start} end={clip.end} length={clip.episode.audioLength} />
    <Link className={css(coverContainer)} to={`/clip/${clip.id}`}>
      <h4 className={styles.title}>{clip.title}</h4>
    </Link>
    <h5 className={styles.episode}>{clip.episode.title}</h5>
    <ClipCardAttributes className={styles.footer} clip={clip} />
  </Card>
);

export default PodcastClipCard;
