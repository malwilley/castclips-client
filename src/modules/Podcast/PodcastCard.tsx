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
    borderRadius: 16,
    display: 'grid',
    gridTemplateRows: 'auto 50px',
    gridTemplateColumns: '140px auto',
    height: 200,
    width: 700,
  }),
  infoContainer: css({
    '& > :not(:last-child)': {
      marginRight: 20,
    },
    display: 'flex',
    alignItems: 'center',
    color: colors.light,
    lineHeight: 1,
  }),
  link: css({
    display: 'flex',
    alignItems: 'center',
    maxWidth: 200,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textDecoration: 'underline',
    whiteSpace: 'nowrap',
  }),
  thumbnail: css({
    gridRow: '1 / 2',
    gridColumn: '1 / 2',
    width: 120,
    height: 120,
    borderRadius: '50%',
    border: `6px solid ${colors.light}`,
    boxShadow: 'var(--card-dropshadow)',
  }),
};

// todo: get 'publisher' on types from podcast metadata
// todo: sanitize url (https//www and listennotes crap)
// pass in number of clips

const renderPodcastData = ({ thumbnail, website }: PodcastMetadata) => {
  return (
    <>
      <div className={styles.infoContainer}>
        <div className={styles.link}>
          <EarthIcon size={20} />
          <a href={website}>{website}</a>
        </div>
      </div>
      <img className={styles.thumbnail} src={thumbnail} />
    </>
  );
};

const PodcastCard: React.FC<PodcastCardProps> = ({ podcast }) => {
  return <HttpContent request={podcast} renderSuccess={renderPodcastData} />;
};

export default PodcastCard;
