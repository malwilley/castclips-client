import * as React from 'react';
import { HttpRequest } from '~/types';
import { PodcastMetadata } from './types';
import Card from '~/components/Card';
import HttpContent from '~/components/HttpContent';
import { css } from 'emotion';
import { colors } from '~/styles';
import { EarthIcon } from 'mdi-react';

type PodcastCardProps = {
  podcast: HttpRequest<PodcastMetadata>;
};

const styles = {
  main: css({
    display: 'grid',
    gridTemplateColumns: '[left] 1fr [middle] auto [right] 1fr',
    gridColumnGap: 20,
    alignItems: 'center',
    color: colors.light,
  }),
  left: css({
    gridTemplateAreas: 'left',
    justifySelf: 'end',
  }),
  middle: css({
    gridTemplateAreas: 'middle',
  }),
  right: css({
    gridTemplateAreas: 'right',
    justifySelf: 'start',
  }),
  infoContainer: css({
    '& > :not(:last-child)': {
      marginRight: 20,
    },
    lineHeight: 1,
  }),
  link: css({
    maxWidth: 200,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textDecoration: 'underline',
    whiteSpace: 'nowrap',
    fontFamily: 'var(--h-font)',
  }),
  episodes: css({
    display: 'flex',
    alignItems: 'flex-end',
    fontFamily: 'var(--h-font)',
  }),
  episodesNumber: css({
    fontSize: 20,
    marginRight: 4,
  }),
  episodesText: css({
    fontSize: 16,
  }),
  placeholder: css({
    height: 20,
    borderRadius: 8,
    color: colors.light,
    opacity: 0.6,
    width: 100,
  }),
  thumbnail: css({
    width: 150,
    height: 150,
    borderRadius: '50%',
    border: `6px solid ${colors.lightest}`,
    boxShadow: 'var(--card-dropshadow)',
    backgroundColor: colors.lightest,
  }),
};

const sanitizeUrl = (url: string) => {
  const regex = /https?:\/\/(?:www.)?(.*)\?utm/;
  const result = regex.exec(url);

  if (!result || !result[1]) {
    return url;
  }
  return result[1];
};

const PodcastDataFetching: React.FC = () => (
  <div className={styles.main}>
    <div className={css(styles.left, styles.placeholder)} />
    <div className={css(styles.middle, styles.thumbnail)} />
    <div className={css(styles.right, styles.placeholder)} />
  </div>
);

const PodcastDataSuccess: React.FC<PodcastMetadata> = ({ thumbnail, website, totalEpisodes }) => (
  <div className={styles.main}>
    <div className={styles.left}>
      <div className={styles.episodes}>
        <div className={styles.episodesNumber}>{totalEpisodes}</div>{' '}
        <div className={styles.episodesText}>episodes</div>
      </div>
    </div>
    <img className={css(styles.middle, styles.thumbnail)} src={thumbnail} />
    <div className={styles.right}>
      <div className={styles.link}>
        <EarthIcon size={20} />
        <a href={website}>{sanitizeUrl(website)}</a>
      </div>
    </div>
  </div>
);

const PodcastCard: React.FC<PodcastCardProps> = ({ podcast }) => {
  return (
    <HttpContent
      request={podcast}
      renderFetching={() => <PodcastDataFetching />}
      renderSuccess={data => <PodcastDataSuccess {...data} />}
    />
  );
};

export default PodcastCard;
