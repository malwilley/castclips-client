import * as React from 'react';
import Card from '~/components/Card';
import { css } from 'emotion';
import { colors } from '~/styles';
import { ClockOutlineIcon, CalendarDayIcon, AnimationPlayOutlineIcon } from 'mdi-react';
import formatPublishDate from '~/utils/formatPublishDate';
import { PodcastResult, EpisodeResult, SearchType } from '../types';

type SearchResultCardProps = PodcastResult | EpisodeResult;

const styles = {
  main: css({
    padding: 20,
    marginBottom: 20,
  }),
  thumbnail: css({
    height: 150,
    width: 150,
    borderRadius: 8,
    marginRight: 20,
    marginBottom: 15,
    float: 'left',
  }),
  description: css({
    color: colors.gray700,
    margin: '6px 0 0 0',
  }),
  attributesContainer: css({
    display: 'flex',
    alignItems: 'center',
    marginBottom: 4,
  }),
  textIcon: css({
    '& > svg': {
      marginRight: 6,
    },
    display: 'flex',
    alignItems: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: colors.gray700,
    marginRight: 10,
  }),
};

const SearchResultEpisodeAttributes: React.FC<EpisodeResult> = ({ audioLength, published }) => (
  <>
    <div className={styles.textIcon}>
      <CalendarDayIcon size={16} />
      {formatPublishDate(published)}
    </div>
    <div className={styles.textIcon}>
      <ClockOutlineIcon size={16} />
      {audioLength}
    </div>
  </>
);

const SearchResultPodcastAttributes: React.FC<PodcastResult> = ({ numEpisodes }) => (
  <>
    <div className={styles.textIcon}>
      <AnimationPlayOutlineIcon size={16} />
      {numEpisodes} episodes
    </div>
  </>
);

const SearchResultCard: React.FC<SearchResultCardProps> = props => (
  <a href={`/${props.type}/${props.id}`}>
    <Card className={styles.main}>
      <div>
        <img className={styles.thumbnail} src={props.thumbnail} />
        <div className={styles.attributesContainer}>
          {props.type === SearchType.Episodes && <SearchResultEpisodeAttributes {...props} />}
          {props.type === SearchType.Podcasts && <SearchResultPodcastAttributes {...props} />}
        </div>
        <h3>{props.title}</h3>
        <p className={styles.description}>{props.description}</p>
      </div>
    </Card>
  </a>
);

export default SearchResultCard;
