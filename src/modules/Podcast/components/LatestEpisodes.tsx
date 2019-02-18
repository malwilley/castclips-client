import * as React from 'react';
import { PodcastEpisode, PodcastState } from '../types';
import { Link } from 'react-router-dom';
import IconGoTo from '~/icons/GoTo';
import Card from '~/components/Card';
import { css } from 'emotion';
import { colors } from '~/styles';
import LoadMoreEpisodesButton from './LoadMoreEpisodesButton';

type LatestEpisodesProps = {
  episodes: PodcastState['episodes'];
};

const styles = {
  main: css({
    '& > :not(:last-child)': {
      borderBottom: `1px solid ${colors.grayLight}`,
    },
  }),
  episodeRow: {
    main: css({
      '&:hover': {
        backgroundColor: colors.light,
      },
      height: 70,
      display: 'grid',
      gridTemplateColumns: 'auto 50px',
      padding: '15px 20px',
    }),
    titleDescriptionContainer: css({
      gridColumn: '1 / 2',
      overflow: 'hidden',
    }),
    iconContainer: css({
      '& > svg': {
        fill: colors.dark,
        height: 24,
        width: 24,
      },
      gridColumn: '2 / -1',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingLeft: 20,
    }),
    title: css({
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    }),
    description: css({
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      margin: 0,
      fontSize: 12,
      whiteSpace: 'nowrap',
    }),
  },
};

const EpisodeRow: React.FC<{ episode: PodcastEpisode }> = ({
  episode: { id, title, description },
}) => (
  <Link to={`/episode/${id}`} className={styles.episodeRow.main}>
    <div className={styles.episodeRow.titleDescriptionContainer}>
      <h4 className={styles.episodeRow.title}>{title}</h4>
      <p className={styles.episodeRow.description} title={description}>
        {description}
      </p>
    </div>
    <div className={styles.episodeRow.iconContainer}>
      <IconGoTo />
    </div>
  </Link>
);

const EpisodeRowLoading: React.FC = () => <div />;

const LatestEpisodes: React.FC<LatestEpisodesProps> = ({ episodes }) => {
  if (episodes.type === 'not_asked') {
    return null;
  }

  const episodeList = episodes.data;

  return (
    <Card className={styles.main}>
      {episodeList.length > 0
        ? episodeList.map(episode => <EpisodeRow key={episode.id} episode={episode} />)
        : Array(10)
            .fill(0)
            .map((_, index) => <EpisodeRowLoading key={index} />)}
      {episodeList.length > 0 && <LoadMoreEpisodesButton episodes={episodes} />}
    </Card>
  );
};

export default LatestEpisodes;
