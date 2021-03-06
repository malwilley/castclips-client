import React, { useEffect } from 'react'
import HttpContent from 'components/HttpContent'
import ClipCard from 'modules/clip/components/ClipCard'
import { AppState } from 'redux/types'
import PageWithFeaturedContent from 'components/PageWithFeaturedContent'
import SectionHeader from 'components/SectionHeader'
import { Link } from 'react-router-dom'
import { css } from 'emotion'
import { colors, fonts } from 'styles'
import PageTitleFetching from 'components/PageTitleFetching'
import ClipPageBody from './ClipPageBody'
import PodcastLink from 'components/PodcastLink'
import { useSelector, useDispatch } from 'react-redux'
import { actions } from '../redux/actions'
import useTitle from 'hooks/useTitle'
import HttpUnion from 'utils/HttpUnion'
import { ClipMetadata } from '../types'

type ClipPageProps = {
  id: string
}

const styles = {
  subTitle: css(fonts.bold300, {
    ' > a': {
      color: colors.white,
    },
    color: colors.secondary50,
    verticalAlign: 'middle',
  }),
  episodeLink: css({
    '&:hover': {
      textDecoration: 'underline',
    },
    display: 'inline',
    margin: '0 4px',
  }),
  title: css(fonts.heading700, {
    marginBottom: 6,
  }),
}

const ClipPage: React.FC<ClipPageProps> = ({ id }) => {
  const dispatch = useDispatch()
  const clipUnion = useSelector((state: AppState) => state.clip.metadata)

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(actions.fetchClip(id))
  }, [id, dispatch])

  useTitle(HttpUnion.map(({ title }: ClipMetadata) => title)(clipUnion))

  return (
    <PageWithFeaturedContent
      bodyContent={<ClipPageBody clipId={id} clipMetadata={clipUnion} />}
      featuredContent={<ClipCard clip={clipUnion} />}
      titleContent={
        <HttpContent
          request={clipUnion}
          renderFetching={() => (
            <>
              <SectionHeader light>user clip</SectionHeader>
              <PageTitleFetching />
            </>
          )}
          renderSuccess={({ title, episode, podcast }) => (
            <>
              <SectionHeader light>user clip</SectionHeader>
              <h1 className={styles.title}>{title}</h1>
              <h4 className={styles.subTitle}>
                From the episode{' '}
                <Link className={styles.episodeLink} to={`/episode/${episode.id}`}>
                  {episode.title}
                </Link>{' '}
                of the podcast{' '}
                <PodcastLink id={podcast.id} thumbnail={podcast.thumbnail} title={podcast.title} />
              </h4>
            </>
          )}
        />
      }
    />
  )
}

export default ClipPage
