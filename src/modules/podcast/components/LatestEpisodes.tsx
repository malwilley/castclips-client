import * as React from 'react';
import { PodcastEpisode, PodcastState } from '../types';
import { Link } from 'react-router-dom';
import Card from 'src/components/Card';
import { css } from 'emotion';
import { colors, fonts } from 'src/styles';
import LoadMoreEpisodesButton from './LoadMoreEpisodesButton';
import ClockOutlineIcon from 'mdi-react/ClockOutlineIcon';
import CalendarDayIcon from 'mdi-react/CalendarDayIcon';
import ArtistIcon from 'mdi-react/ArtistIcon';
import formatPublishDate from 'src/utils/formatPublishDate';
import TextSkeleton from 'src/components/TextSkeleton';
import stripHtml from 'src/utils/stripHtml';
import capitalizeFirstLetter from 'src/utils/capitalizeFirstLetter';

type LatestEpisodesProps = {
  episodes: PodcastState['episodes'];
};

const styles = {
  main: css({
    '& > :not(:last-child)': {
      borderBottom: `1px solid ${colors.gray50}`,
    },
  }),
  episodeRow: {
    main: css({
      '&:hover': {
        backgroundColor: '#f8faff',
      },
      display: 'grid',
      gridTemplateColumns: '[thumbnail] auto [middle] 1fr',
      gridColumnGap: 20,
      alignItems: 'start',
      padding: '15px 18px',
    }),
    thumbnail: css({
      gridTemplateAreas: 'thumbnail',
      borderRadius: 8,
      height: '4rem',
      width: '4rem',
    }),
    textIconContainer: css({
      display: 'flex',
      marginTop: '0.375rem',
    }),
    textIcon: css(fonts.attribute300),
    textIconGreen: css({
      color: colors.green200,
    }),
    titleDescriptionContainer: css({
      gridTemplateAreas: 'middle',
      overflow: 'hidden',
      marginTop: '0.25rem',
    }),
    title: css(fonts.heading300, {
      lineHeight: 1,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      marginBottom: '0.05rem',
    }),
    description: css(fonts.text250, {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      margin: 0,
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
        <h4 className={styles.episodeRow.title}>{title}</h4>
        <p className={styles.episodeRow.description} title={sanitizedDescription}>
          {sanitizedDescription}
        </p>
        <div className={styles.episodeRow.textIconContainer}>
          <div className={styles.episodeRow.textIcon}>
            <CalendarDayIcon />
            <div>{capitalizeFirstLetter(formatPublishDate(published))}</div>
          </div>
          <div className={styles.episodeRow.textIcon}>
            <ClockOutlineIcon />
            <div>{(audioLength / 60).toFixed(0)} min</div>
          </div>
          {/*
          <div className={css(styles.episodeRow.textIcon, styles.episodeRow.textIconGreen)}>
          <ArtistIcon size={14} />
          <div>6 clips</div>
          </div>
        */}
        </div>
      </div>
    </Link>
  );
};

const EpisodeRowLoading: React.FC = () => (
  <div className={styles.episodeRow.main}>
    <TextSkeleton className={styles.episodeRow.thumbnail} />
    <div className={styles.episodeRow.titleDescriptionContainer}>
      <TextSkeleton color={colors.gray50} height={13} marginBottom={2} width={150} />
      <TextSkeleton color={colors.gray200} height={16} marginBottom={4} width={200} />
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
