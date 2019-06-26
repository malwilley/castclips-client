import * as React from 'react';
import Card from 'src/components/Card';
import { css } from 'emotion';
import { colors, fonts } from 'src/styles';
import { ClipMetadata } from 'src/modules/clip/types';
import ClipCardAttributes from 'src/components/ClipCardAttributes';
import ClipCardAccent from 'src/components/ClipCardAccent';

type PodcastClipCardProps = {
  clip: ClipMetadata;
};

const styles = {
  main: css({
    padding: 16,
  }),
  episode: css({
    color: colors.gray200,
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
  title: css({
    marginBottom: 4,
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
    <ClipCardAccent start={clip.start} end={clip.end} length={clip.episode.audioLength} />
    <h4 className={styles.title}>{clip.title}</h4>
    <h5 className={styles.episode}>{clip.episode.title}</h5>
    <ClipCardAttributes className={styles.footer} clip={clip} />
  </Card>
);

export default PodcastClipCard;
