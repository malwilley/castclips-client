import React from 'react'
import { HttpRequest } from 'types'
import { PodcastMetadata } from '../types'
import HttpContent from 'components/HttpContent'
import { css } from 'emotion'
import { colors, boxShadow, fonts } from 'styles'
import PageTitleFetching from 'components/PageTitleFetching'

type PodcastCardProps = {
  podcast: HttpRequest<PodcastMetadata>
}

const styles = {
  main: css({
    color: colors.light,
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
  }),
  heading: css({
    '@media (min-width: 800px)': {
      padding: '1rem 0 0 1rem',
    },
    '& > h1': {
      marginBottom: '0.5rem',
    },
    marginBottom: '1rem',
  }),
  publisher: css(fonts.bold300, {
    color: colors.secondary50,
  }),
  infoContainer: css({
    '@media (min-width: 600px)': {
      display: 'block',
    },
    display: 'none',
    flexGrow: 1,
    width: 0,
    padding: '10px 20px',
  }),
  placeholder: css({
    backgroundColor: colors.gray20,
  }),
  thumbnail: css({
    '@media (max-width: 800px)': {
      width: 200,
      height: 200,
    },
    '@media (max-width: 600px)': {
      width: 260,
      height: 260,
      margin: '0 auto',
    },
    width: 260,
    height: 260,
    borderRadius: 16,
    border: `6px solid ${colors.white}`,
    boxShadow: boxShadow.card,
    backgroundColor: colors.white,
  }),
}

const PodcastDataFetching: React.FC = () => (
  <div className={styles.main}>
    <div className={css(styles.thumbnail, styles.placeholder)} />
    <div className={styles.infoContainer}>
      <PageTitleFetching className={styles.heading} />
    </div>
  </div>
)

const PodcastDataSuccess: React.FC<PodcastMetadata> = ({ publisher, thumbnail, title }) => (
  <div className={styles.main}>
    <img alt="Podcast thumbnail" className={styles.thumbnail} src={thumbnail} />
    <div className={styles.infoContainer}>
      <div className={styles.heading}>
        <h1>{title}</h1>
        <div className={styles.publisher}>{publisher}</div>
      </div>
    </div>
  </div>
)

const PodcastCard: React.FC<PodcastCardProps> = ({ podcast }) => {
  return (
    <HttpContent
      request={podcast}
      renderFetching={() => <PodcastDataFetching />}
      renderSuccess={(data) => <PodcastDataSuccess {...data} />}
    />
  )
}

export default PodcastCard
