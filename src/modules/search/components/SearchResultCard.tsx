import * as React from 'react';
import Card from '~/components/Card';
import { css } from 'emotion';
import { colors } from '~/styles';
import { ClockOutlineIcon, CalendarDayIcon, AnimationPlayOutlineIcon } from 'mdi-react';
import formatPublishDate from '~/utils/formatPublishDate';
import { PodcastResult, EpisodeResult, SearchType, ClipResult } from '../types';
import TextSkeleton from '~/components/TextSkeleton';
import formatHrMinSec from '~/utils/formatHrMinSec';

type SearchResultCardProps = PodcastResult | ClipResult | EpisodeResult;

const styles = {
  main: css({
    '&:hover': {
      boxShadow: 'var(--card-dropshadow-feature)',
    },
    padding: 20,
    marginBottom: 20,
    transition: 'box-shadow 300ms ease-out',
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
  subText: css({
    color: colors.gray700,
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

const fetchingStyles = {
  main: css({
    display: 'flex',
  }),
  thumbnail: css({
    backgroundColor: colors.gray100,
    float: 'none',
    border: 'none',
  }),
};

const SearchResultEpisodeAttributes: React.FC<EpisodeResult | ClipResult> = ({
  audioLength,
  published,
}) => (
  <>
    <div className={styles.textIcon}>
      <CalendarDayIcon size={16} />
      {formatPublishDate(published)}
    </div>
    <div className={styles.textIcon}>
      <ClockOutlineIcon size={16} />
      {typeof audioLength === 'number' ? formatHrMinSec(audioLength) : audioLength}
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

const SubText: React.FC<SearchResultCardProps> = props => {
  switch (props.type) {
    case SearchType.Episodes:
      return <h4 className={styles.subText}>{props.podcast.title}</h4>;
    case SearchType.Podcasts:
      return <h4 className={styles.subText}>{props.publisher}</h4>;
    case SearchType.Clips:
      return (
        <div>
          <h4 className={styles.subText}>{props.podcast.title}</h4>
          <h4 className={styles.subText}>{props.episode.title}</h4>
        </div>
      );
    default:
      return null;
  }
};

const SearchResultCardFetching: React.FC = () => (
  <Card className={css(styles.main, fetchingStyles.main)}>
    <div className={css(styles.thumbnail, fetchingStyles.thumbnail)} />
    <div>
      <TextSkeleton width={110} height={18} marginBottom={2} color={colors.gray100} />
      <TextSkeleton width={200} height={23} marginBottom={2} color={colors.gray300} />
      <TextSkeleton width={80} height={18} marginBottom={4} color={colors.gray200} />
      <TextSkeleton width={250} height={16} marginBottom={2} color={colors.gray100} />
      <TextSkeleton width={230} height={16} marginBottom={2} color={colors.gray100} />
      <TextSkeleton width={280} height={16} marginBottom={2} color={colors.gray100} />
    </div>
  </Card>
);

const SearchResultCard: React.FC<SearchResultCardProps> = props => (
  <a href={`/${props.type}/${props.id}`}>
    <Card className={styles.main}>
      <img className={styles.thumbnail} src={props.thumbnail} />
      <div className={styles.attributesContainer}>
        {(props.type === SearchType.Episodes || props.type === SearchType.Clips) && (
          <SearchResultEpisodeAttributes {...props} />
        )}
        {props.type === SearchType.Podcasts && <SearchResultPodcastAttributes {...props} />}
      </div>
      <h3>{props.title}</h3>
      <SubText {...props} />
      <p className={styles.description}>{props.description}</p>
    </Card>
  </a>
);

export { SearchResultCardFetching };
export default SearchResultCard;
