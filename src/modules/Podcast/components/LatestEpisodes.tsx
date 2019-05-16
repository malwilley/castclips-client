import * as React from 'react';
import { PodcastEpisode, PodcastState } from '../types';
import { Link } from 'react-router-dom';
import Card from '~/components/Card';
import { css } from 'emotion';
import { colors } from '~/styles';
import LoadMoreEpisodesButton from './LoadMoreEpisodesButton';
import { ClockOutlineIcon, CalendarDayIcon, ArtistIcon } from 'mdi-react';
import formatPublishDate from '~/utils/formatPublishDate';
import TextSkeleton from '~/components/TextSkeleton';
import stripHtml from '~/utils/stripHtml';

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
        backgroundColor: '#f8faff',
      },
      height: 90,
      display: 'grid',
      gridTemplateColumns: '[thumbnail] auto [middle] 1fr',
      gridColumnGap: 20,
      alignItems: 'center',
      padding: '15px 18px',
    }),
    thumbnail: css({
      gridTemplateAreas: 'thumbnail',
      borderRadius: 8,
      height: 59,
      width: 59,
    }),
    textIconContainer: css({
      display: 'flex',
    }),
    textIcon: css({
      '& > svg': {
        marginRight: 6,
      },
      display: 'flex',
      alignItems: 'center',
      fontSize: 10,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      letterSpacing: 1,
      color: colors.gray700,
      marginRight: 10,
    }),
    textIconGreen: css({
      color: colors.green,
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
      fontSize: 14,
      whiteSpace: 'nowrap',
    }),
  },
};

const EpisodeRow: React.FC<{ episode: PodcastEpisode }> = ({
  episode: { audioLength, id, title, description, published, thumbnail },
}) => {
  const sanitizedDescription = stripHtml(description);
  return (
    <Link to={`/episode/${id}`} className={styles.episodeRow.main}>
      <img className={styles.episodeRow.thumbnail} src={thumbnail} />
      <div className={styles.episodeRow.titleDescriptionContainer}>
        <div className={styles.episodeRow.textIconContainer}>
          <div className={styles.episodeRow.textIcon}>
            <CalendarDayIcon size={14} />
            <div>{formatPublishDate(published)}</div>
          </div>
          <div className={styles.episodeRow.textIcon}>
            <ClockOutlineIcon size={14} />
            <div>{(audioLength / 60).toFixed(0)} min</div>
          </div>
          <div className={css(styles.episodeRow.textIcon, styles.episodeRow.textIconGreen)}>
            <ArtistIcon size={14} />
            <div>6 clips</div>
          </div>
        </div>
        <h4 className={styles.episodeRow.title}>{title}</h4>
        <p className={styles.episodeRow.description} title={sanitizedDescription}>
          {sanitizedDescription}
        </p>
      </div>
    </Link>
  );
};

const EpisodeRowLoading: React.FC = () => (
  <div className={styles.episodeRow.main}>
    <TextSkeleton className={styles.episodeRow.thumbnail} />
    <div className={styles.episodeRow.titleDescriptionContainer}>
      <TextSkeleton color={colors.gray200} height={13} marginBottom={2} width={150} />
      <TextSkeleton color={colors.gray700} height={16} marginBottom={4} width={200} />
      <TextSkeleton height={15} marginBottom={0} />
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
