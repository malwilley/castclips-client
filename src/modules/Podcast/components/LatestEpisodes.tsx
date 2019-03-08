import * as React from 'react';
import { PodcastEpisode, PodcastState } from '../types';
import { Link } from 'react-router-dom';
import IconGoTo from '~/icons/GoTo';
import Card from '~/components/Card';
import { css } from 'emotion';
import { colors } from '~/styles';
import LoadMoreEpisodesButton from './LoadMoreEpisodesButton';
import HttpContent from '~/components/HttpContent';
import { ClockOutlineIcon } from 'mdi-react';

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
      height: 90,
      display: 'grid',
      gridTemplateColumns: '[thumbnail] auto [middle] 1fr',
      gridColumnGap: 20,
      padding: '15px 20px',
    }),
    thumbnail: css({
      gridTemplateAreas: 'thumbnail',
      borderRadius: 8,
      height: 59,
      width: 59,
    }),
    textIcon: css({
      '& > svg': {
        marginRight: 6,
      },
      display: 'flex',
      alignItems: 'center',
      fontSize: 12,
      fontWeight: 'bold',
      fontFamily: 'var(--h-font)',
    }),
    titleDescriptionContainer: css({
      gridTemplateAreas: 'middle',
      overflow: 'hidden',
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
  episode: { id, title, description, published, thumbnail },
}) => (
  <Link to={`/episode/${id}`} className={styles.episodeRow.main}>
    <img className={styles.episodeRow.thumbnail} src={thumbnail} />
    <div className={styles.episodeRow.titleDescriptionContainer}>
      <h4 className={styles.episodeRow.title}>{title}</h4>
      <p className={styles.episodeRow.description} title={description}>
        <div className={styles.episodeRow.textIcon}>
          <ClockOutlineIcon size={14} />
          {published.toLocaleDateString()}
        </div>
        {description}
      </p>
    </div>
  </Link>
);

const EpisodeRowLoading: React.FC = () => (
  <div className={styles.episodeRow.main}>
    <div className={styles.episodeRow.titleDescriptionContainer}>
      <h4 className={styles.episodeRow.title} />
      <p className={styles.episodeRow.description} />
    </div>
  </div>
);

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
