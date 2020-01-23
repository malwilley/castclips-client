import React, { useEffect } from 'react'
import PodcastCard from 'modules/podcast/components/PodcastCard'
import { useDispatch, useSelector } from 'react-redux'
import PageWithFeaturedContent from 'components/PageWithFeaturedContent'
import SectionHeader from 'components/SectionHeader'
import { css } from 'emotion'
import LatestEpisodes from './LatestEpisodes'
import PodcastClips from './PodcastClips'
import HttpContent from 'components/HttpContent'
import { colors, clickable, fonts } from 'styles'
import PageTitleFetching from 'components/PageTitleFetching'
import ParagraphSkeleton from 'components/ParagraphSkeleton'
import Attribute from 'components/Attribute'
import AnimationPlayOutlineIcon from 'mdi-react/AnimationPlayOutlineIcon'
import LinkIcon from 'mdi-react/LinkVariantIcon'
import sanitizeUrl from 'utils/sanitizeUrl'
import { actions } from '../redux'
import { getPodcastMetadataUnion, getPodcastEpisodesUnion } from '../selectors'
import useTitle from 'hooks/useTitle'
import HttpUnion from 'utils/HttpUnion'
import { PodcastMetadata } from '../types'

type PodcastPageProps = {
  id: string
}

const styles = {
  main: css({
    '@media (min-width: 800px)': {
      gridTemplateColumns: '[episodes] 1fr [clips] 300px',
    },
    '@media (min-width: 1800px)': {
      gridTemplateColumns: '[episodes] 1fr [clips] 400px',
    },
    display: 'grid',
    gridTemplateColumns: '[episodes] 1fr',
    gridColumnGap: 40,
  }),
  heading: css({
    '& > h1': {
      marginBottom: '0.5rem',
    },
    marginBottom: '1rem',
  }),
  publisher: css(fonts.bold300, {
    color: colors.secondary50,
  }),
  description: css({
    color: colors.gray600,
    marginBottom: 40,
  }),
  sectionHeader: css({
    marginBottom: 20,
  }),
  episodes: css({
    gridTemplateAreas: 'episodes',
    overflow: 'hidden',
  }),
  clips: css({
    gridTemplateAreas: 'clips',
  }),
  episodesNumber: css({
    fontWeight: 900,
    marginRight: '0.4em',
  }),
  title: css({
    '@media (min-width: 600px)': {
      display: 'none',
    },
  }),
  link: css(clickable, {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    textDecoration: 'underline',
    width: '100%',
  }),
  podcastSectionHeader: css({
    '@media (min-width: 600px)': {
      marginBottom: '-1rem',
    },
    '@media (min-width: 800px)': {
      marginBottom: '-2rem',
    },
  }),
  titleContainer: css({
    '@media (min-width: 600px)': {
      minHeight: 'unset',
    },
  }),
}

const PodcastPage: React.FC<PodcastPageProps> = ({ id }) => {
  const dispatch = useDispatch()

  const podcastUnion = useSelector(getPodcastMetadataUnion)
  const episodesUnion = useSelector(getPodcastEpisodesUnion)

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(actions.fetchPodcastMetadata(id))
  }, [dispatch, id])

  useTitle(HttpUnion.map(({ title }: PodcastMetadata) => title)(podcastUnion))

  return (
    <PageWithFeaturedContent
      bodyContent={
        <div className={styles.main}>
          <section className={styles.episodes}>
            <SectionHeader className={styles.sectionHeader}>description</SectionHeader>
            <div className={styles.description}>
              <HttpContent
                request={podcastUnion}
                renderFetching={() => <ParagraphSkeleton />}
                renderSuccess={({ description }) => (
                  <div dangerouslySetInnerHTML={{ __html: description }} />
                )}
              />
            </div>
            <SectionHeader className={styles.sectionHeader}>latest episodes</SectionHeader>
            <LatestEpisodes episodes={episodesUnion} />
          </section>
          <section className={styles.clips}>
            <SectionHeader>podcast information</SectionHeader>
            <HttpContent
              request={podcastUnion}
              renderFetching={() => <ParagraphSkeleton />}
              renderSuccess={({ totalEpisodes, website }) => (
                <div>
                  <Attribute icon={<AnimationPlayOutlineIcon />}>
                    <strong className={styles.episodesNumber}>{totalEpisodes}</strong> episodes
                  </Attribute>
                  {website && (
                    <Attribute icon={<LinkIcon />}>
                      <a className={styles.link} href={website}>
                        {sanitizeUrl(website)}
                      </a>
                    </Attribute>
                  )}
                </div>
              )}
            />
            <SectionHeader className={styles.sectionHeader}>user clips</SectionHeader>
            <PodcastClips />
          </section>
        </div>
      }
      featuredContent={<PodcastCard podcast={podcastUnion} />}
      titleContent={
        <>
          <SectionHeader className={styles.podcastSectionHeader} light>
            podcast
          </SectionHeader>
          <div className={styles.title}>
            <HttpContent
              request={podcastUnion}
              renderFetching={() => <PageTitleFetching />}
              renderSuccess={({ title, publisher }) => (
                <div className={styles.heading}>
                  <h1>{title}</h1>
                  <div className={styles.publisher}>{publisher}</div>
                </div>
              )}
            />
          </div>
        </>
      }
      titleClassName={styles.titleContainer}
    />
  )
}

export default PodcastPage
