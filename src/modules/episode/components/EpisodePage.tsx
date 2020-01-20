import React from 'react'
import HttpContent from 'components/HttpContent'
import EpisodeCard from 'modules/episode/components/EpisodeCard'
import { useDispatch, useSelector } from 'react-redux'
import { css } from 'emotion'
import { colors, fonts } from 'styles'
import SectionHeader from 'components/SectionHeader'
import PageWithFeaturedContent from 'components/PageWithFeaturedContent'
import PageTitleFetching from 'components/PageTitleFetching'
import EpisodePageBody from './EpisodePageBody'
import PodcastLink from 'components/PodcastLink'
import { useRouteMatch, useLocation } from 'react-router'
import { parse } from 'querystringify'
import { getEpisodeUnion } from '../selectors'
import { actions } from '../redux/actions'

const styles = {
  description: css({
    color: colors.gray600,
    maxHeight: 180,
    overflow: 'hidden',
  }),
  published: css({
    '& > svg': {
      fill: colors.gray600,
      marginRight: 8,
    },
    color: colors.gray500,
    display: 'flex',
    alignItems: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontSize: 12,
    fontWeight: 'bold',
    margin: '20px 0 0 0',
  }),
  section: css({
    marginBottom: 50,
  }),
  sectionHeader: css({
    marginBottom: 30,
  }),
  subTitle: css(fonts.bold300, {
    '& > a': {
      color: colors.white,
    },
    color: colors.secondary50,
  }),
  title: css(fonts.heading700, {
    marginBottom: 6,
  }),
}

const EpisodePage: React.FC = () => {
  const dispatch = useDispatch()
  const episodeMetadata = useSelector(getEpisodeUnion)

  const {
    params: { id },
  } = useRouteMatch<{ id: string }>()

  const { search } = useLocation()

  const { time } = parse(search) as { time?: string }

  React.useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(actions.fetchEpisode(id))
  }, [dispatch, id])

  return (
    <PageWithFeaturedContent
      bodyContent={<EpisodePageBody episodeMetadata={episodeMetadata} id={id} />}
      featuredContent={<EpisodeCard episode={episodeMetadata} time={Number(time)} />}
      titleContent={
        <HttpContent
          request={episodeMetadata}
          renderFetching={() => (
            <>
              <SectionHeader light>episode</SectionHeader>
              <PageTitleFetching />
            </>
          )}
          renderSuccess={({ title, podcast }) => (
            <>
              <SectionHeader light>episode</SectionHeader>
              <h1 className={styles.title}>{title}</h1>
              <h4 className={styles.subTitle}>
                From the podcast{' '}
                <PodcastLink id={podcast.id} thumbnail={podcast.thumbnail} title={podcast.title} />
              </h4>
            </>
          )}
        />
      }
    />
  )
}

export default EpisodePage
