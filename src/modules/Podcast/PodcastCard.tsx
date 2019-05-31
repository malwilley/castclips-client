import * as React from 'react';
import { HttpRequest } from '~/types';
import { PodcastMetadata } from './types';
import HttpContent from '~/components/HttpContent';
import { css } from 'emotion';
import { colors, boxShadow } from '~/styles';
import { EarthIcon } from 'mdi-react';
import { dropLast, last } from 'ramda';
import TextSkeleton from '~/components/TextSkeleton';
import PageTitleFetching from '~/components/PageTitleFetching';

type PodcastCardProps = {
  podcast: HttpRequest<PodcastMetadata>;
};

const styles = {
  main: css({
    color: colors.light,
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
  }),
  heading: css({
    '& > h1': {
      marginBottom: 6,
    },
    '& > h4': {
      color: colors.secondary,
    },
    marginBottom: 16,
  }),
  infoContainer: css({
    '@media (max-width: 600px)': {
      display: 'none',
    },
    flexGrow: 1,
    width: 0,
    padding: '10px 20px',
  }),
  link: css({
    '& > svg': {
      marginRight: 4,
    },
    '& > a': {},
    display: 'flex',
    alignItems: 'center',
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textDecoration: 'underline',
    whiteSpace: 'nowrap',
  }),
  episodes: css({
    display: 'flex',
    alignItems: 'flex-end',
  }),
  episodesNumber: css({
    fontSize: 28,
    marginRight: 8,
    fontWeight: 'bold',
  }),
  episodesText: css({
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  }),
  placeholder: css({
    backgroundColor: colors.gray20,
  }),
  thumbnail: css({
    '@media (max-width: 800px)': {
      width: 200,
      height: 200,
    },
    '@media (max-width: 600px)': {
      width: 260,
      height: 260,
      margin: '0 auto',
    },
    width: 260,
    height: 260,
    borderRadius: 16,
    border: `6px solid ${colors.lightest}`,
    boxShadow: boxShadow.prominent,
    backgroundColor: colors.lightest,
  }),
};

const sanitizeUrl = (url: string) => {
  const regex = /https?:\/\/(?:www.)?(.*)\?utm/;
  const result = regex.exec(url);

  if (!result || !result[1]) {
    return url;
  }

  const formatted = result[1];
  return last(formatted) === '/' ? dropLast(1, formatted) : formatted;
};

const PodcastDataFetching: React.FC = () => (
  <div className={styles.main}>
    <div className={css(styles.thumbnail, styles.placeholder)} />
    <div className={styles.infoContainer}>
      <PageTitleFetching className={styles.heading} />
      <TextSkeleton color={colors.secondary200} width={100} height={20} marginBottom={4} />
      <TextSkeleton color={colors.secondary200} width={100} height={20} marginBottom={4} />
      <TextSkeleton color={colors.secondary200} width={200} height={20} />
    </div>
  </div>
);

const PodcastDataSuccess: React.FC<PodcastMetadata> = ({
  publisher,
  thumbnail,
  website,
  title,
  totalEpisodes,
}) => (
  <div className={styles.main}>
    <img className={styles.thumbnail} src={thumbnail} />
    <div className={styles.infoContainer}>
      <div className={styles.heading}>
        <h1>{title}</h1>
        <h4>{publisher}</h4>
      </div>
      <div className={styles.episodes}>
        <div className={styles.episodesNumber}>{totalEpisodes}</div>{' '}
        <div className={styles.episodesText}>episodes</div>
      </div>
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
