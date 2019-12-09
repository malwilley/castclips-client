import React, { useState } from 'react';
import { PodcastEpisode, PodcastState } from '../types';
import { Link } from 'react-router-dom';
import { css } from 'emotion';
import { colors, fonts } from 'src/styles';
import LoadMoreEpisodesButton from './LoadMoreEpisodesButton';
import ClockOutlineIcon from 'mdi-react/ClockOutlineIcon';
import CalendarDayIcon from 'mdi-react/CalendarDayIcon';
import formatPublishDate from 'src/utils/formatPublishDate';
import TextSkeleton from 'src/components/TextSkeleton';
import stripHtml from 'src/utils/stripHtml';
import capitalizeFirstLetter from 'src/utils/capitalizeFirstLetter';
import { useDispatch, useSelector } from 'react-redux';
import { thunks } from '../redux';
import Card from 'src/components/Card';
import { AppState } from 'src/redux/types';
import { KeyCode } from 'src/types';
import SearchInput from 'src/components/SearchInput';
import Button from 'src/components/Button';

type LatestEpisodesProps = {
  episodes: PodcastState['episodes'];
};

const styles = {
  main: css({
    '& > :not(:last-child)': {
      borderBottom: `1px solid ${colors.gray50}`,
    },
  }),
  header: css({
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }),
  clear: css(fonts.bold250, {
    '&:hover': {
      textDecoration: 'underline',
    },
    color: colors.secondary500,
    marginLeft: '1rem',
  }),
  search: css({
    maxWidth: '20rem',
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
      borderRadius: 4,
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
      marginTop: '0.1rem',
    }),
    title: css(fonts.bold250, {
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
      <img alt="Episode thumbnail" className={styles.episodeRow.thumbnail} src={thumbnail} />
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
          {Number(audioLength) ? (
            <div className={styles.episodeRow.textIcon}>
              <ClockOutlineIcon />
              <div>{(audioLength / 60).toFixed(0)} min</div>
            </div>
          ) : null}
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
      <TextSkeleton color={colors.gray100} height={16} marginBottom={2} width="80%" />
      <TextSkeleton height={15} marginBottom={4} />
      <TextSkeleton color={colors.gray50} height={13} width={150} />
    </div>
  </div>
);

const LatestEpisodes: React.FC<LatestEpisodesProps> = ({ episodes }) => {
  const dispatch = useDispatch();
  const query = useSelector((state: AppState) => state.podcast.search.query);
  const [text, setText] = useState('');

  if (episodes.type === 'not_asked') {
    return null;
  }

  const episodeList = episodes.data;

  return (
    <Card className={styles.main}>
      <div className={styles.header}>
        <SearchInput
          className={styles.search}
          handleTextChange={setText}
          value={text}
          placeholder="Search..."
          onKeyDown={e => {
            if (e.keyCode === KeyCode.Enter) {
              dispatch(thunks.searchEpisodes(text));
            }
          }}
        />
        {query ? (
          <Button
            className={styles.clear}
            onClick={() => {
              setText('');
              dispatch(thunks.clearSearch());
            }}
          >
            Clear
          </Button>
        ) : (
          <div />
        )}
      </div>
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
