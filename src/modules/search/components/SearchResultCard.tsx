import React from 'react'
import Card from 'components/Card'
import { css } from 'emotion'
import { colors, coverContainer, breakpoints, fonts } from 'styles'
import { PodcastResult, EpisodeResult, SearchType, ClipResult } from '../types'
import TextSkeleton from 'components/TextSkeleton'
import { Link } from 'react-router-dom'

type SearchResultCardProps = PodcastResult | ClipResult | EpisodeResult

const styles = {
  main: css({
    marginBottom: '1rem',
    padding: '1.5rem 1.5rem 0.5rem 1.5rem',
    position: 'relative',
    maxHeight: 250,
  }),
  thumbnail: css(
    breakpoints.breakpoint600({
      height: '8rem',
      width: '8rem',
      marginRight: '1.5rem',
    }),
    {
      height: '5rem',
      width: '5rem',
      borderRadius: 8,
      marginRight: '1rem',
      marginBottom: '1rem',
      float: 'left',
    }
  ),
  description: css(fonts.text250, {
    color: colors.gray200,
    margin: '0.5em 0 1rem 0',
  }),
  descriptionContainer: css({
    display: 'inline-block',
  }),
  attributesContainer: css({
    display: 'flex',
    alignItems: 'center',
    marginBottom: 4,
  }),
  subText: css(fonts.bold300, {
    color: colors.gray200,
  }),
  title: css(fonts.heading300, {
    marginBottom: '0.05rem',
    lineHeight: 1,
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
    color: colors.gray200,
    marginRight: 10,
  }),
  hideOverflowGradient: css({
    display: 'flex',
    alignItems: 'flex-end',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '1.5rem',
    background: 'linear-gradient(to top, white 1rem, transparent)',
  }),
}

const fetchingStyles = {
  main: css({
    display: 'flex',
  }),
  textContainer: css({
    flexGrow: 1,
  }),
  thumbnail: css({
    backgroundColor: colors.gray20,
    float: 'none',
    flexShrink: 0,
    border: 'none',
  }),
}

const SubText: React.FC<SearchResultCardProps> = props => {
  switch (props.type) {
    case SearchType.Episodes:
      return <h4 className={styles.subText}>{props.podcast.title}</h4>
    case SearchType.Podcasts:
      return <h4 className={styles.subText}>{props.publisher}</h4>
    case SearchType.Clips:
      return (
        <div>
          <h4 className={styles.subText}>{props.podcast.title}</h4>
          <h4 className={styles.subText}>{props.episode.title}</h4>
        </div>
      )
    default:
      return null
  }
}

const SearchResultCardFetching: React.FC = () => (
  <Card className={css(styles.main, fetchingStyles.main)}>
    <div className={css(styles.thumbnail, fetchingStyles.thumbnail)} />
    <div className={fetchingStyles.textContainer}>
      <TextSkeleton width={170} height={23} marginBottom={2} color={colors.gray20} />
      <TextSkeleton width={190} height={18} marginBottom={4} color={colors.gray20} />
      <TextSkeleton width="92%" height={16} marginBottom={2} color={colors.gray20} />
      <TextSkeleton width="98%" height={16} marginBottom={2} color={colors.gray20} />
      <TextSkeleton width="75%" height={16} marginBottom={2} color={colors.gray20} />
    </div>
  </Card>
)

const SearchResultCard: React.FC<SearchResultCardProps> = props => (
  <Card className={styles.main} hover>
    <img alt="Thumbnail" className={styles.thumbnail} src={props.thumbnail} />
    <Link className={css(coverContainer)} to={`/${props.type}/${props.id}`}>
      <h3 className={styles.title}>{props.title}</h3>
    </Link>
    <SubText {...props} />
    <p className={styles.description}>{props.description}</p>
    <div className={styles.hideOverflowGradient} />
  </Card>
)

export { SearchResultCardFetching }
export default SearchResultCard
