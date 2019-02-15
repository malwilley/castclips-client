import * as React from 'react';
import { HttpRequest } from '~/types';
import { PodcastMetadata } from './types';
import Card from '~/components/Card';
import HttpContent from '~/components/HttpContent';
import { css } from 'emotion';
import { colors } from '~/styles';

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
  description: css({
    gridRow: '1 / 2',
    gridColumn: '2 / -1',
    margin: 0,
    padding: '20px 20px 20px 0',
  }),
  thumbnail: css({
    gridRow: '1 / 2',
    gridColumn: '1 / 2',
    width: 90,
    height: 90,
    borderRadius: 45,
    border: `4px solid ${colors.secondary}`,
    margin: '24px auto',
  }),
};

const renderPodcastData = ({ description, thumbnail, title, website }: PodcastMetadata) => {
  return (
    <>
      <img className={styles.thumbnail} src={thumbnail} />
      <p className={styles.description}>{description}</p>
    </>
  );
};

const PodcastCard: React.FC<PodcastCardProps> = ({ podcast }) => {
  return (
    <Card className={styles.main}>
      <HttpContent request={podcast} renderSuccess={renderPodcastData} />
    </Card>
  );
};

export default PodcastCard;
