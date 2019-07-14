import * as React from 'react';
import PodcastCard from 'src/modules/podcast/components/PodcastCard';
import { thunks } from '../redux';
import { connect } from 'react-redux';
import { AppState } from 'src/redux/types';
import { PodcastState } from '../types';
import PageWithFeaturedContent from 'src/components/PageWithFeaturedContent';
import SectionHeader from 'src/components/SectionHeader';
import { css } from 'emotion';
import LatestEpisodes from './LatestEpisodes';
import PodcastClips from './PodcastClips';
import HttpContent from 'src/components/HttpContent';
import { colors, clickable, fonts } from 'src/styles';
import PageTitleFetching from 'src/components/PageTitleFetching';
import ParagraphSkeleton from 'src/components/ParagraphSkeleton';
import Attribute from 'src/components/Attribute';
import { AnimationPlayOutlineIcon, LinkIcon } from 'mdi-react';
import sanitizeUrl from 'src/utils/sanitizeUrl';

type PodcastPageProps = {
  id: string;
};

type PodcastPageConnectedProps = PodcastPageProps & {
  episodes: PodcastState['episodes'];
  fetchClipsForPodcast: (id: string) => void;
  fetchPodcastMetadata: (id: string) => void;
  podcastMetadata: PodcastState['metadata'];
};

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
  }),
  podcastSectionHeader: css({
    '@media (min-width: 600px)': {
      marginBottom: '-1rem',
    },
    '@media (min-width: 800px)': {
      marginBottom: '-2rem',
    },
  }),
};

const PodcastPage: React.FC<PodcastPageConnectedProps> = ({
  episodes,
  fetchClipsForPodcast,
  fetchPodcastMetadata,
  podcastMetadata,
  id,
}) => {
  React.useEffect(() => {
    fetchPodcastMetadata(id);
    fetchClipsForPodcast(id);
  }, [id]);

  return (
    <PageWithFeaturedContent
      bodyContent={
        <div className={styles.main}>
          <section className={styles.episodes}>
            <SectionHeader className={styles.sectionHeader}>description</SectionHeader>
            <div className={styles.description}>
              <HttpContent
                request={podcastMetadata}
                renderFetching={() => <ParagraphSkeleton />}
                renderSuccess={({ description }) => (
                  <div dangerouslySetInnerHTML={{ __html: description }} />
                )}
              />
            </div>
            <SectionHeader className={styles.sectionHeader}>latest episodes</SectionHeader>
            <LatestEpisodes episodes={episodes} />
          </section>
          <section className={styles.clips}>
            <SectionHeader>podcast information</SectionHeader>
            <HttpContent
              request={podcastMetadata}
              renderFetching={() => <ParagraphSkeleton />}
              renderSuccess={({ totalEpisodes, website }) => (
                <div>
                  <Attribute icon={<AnimationPlayOutlineIcon />}>
                    <strong className={styles.episodesNumber}>{totalEpisodes}</strong> episodes
                  </Attribute>
                  <Attribute icon={<LinkIcon />}>
                    <a className={styles.link} href={website}>
                      {sanitizeUrl(website)}
                    </a>
                  </Attribute>
                </div>
              )}
            />
            <SectionHeader className={styles.sectionHeader}>user clips</SectionHeader>
            <PodcastClips />
          </section>
        </div>
      }
      featuredContent={<PodcastCard podcast={podcastMetadata} />}
      titleContent={
        <>
          <SectionHeader className={styles.podcastSectionHeader} light>
            podcast
          </SectionHeader>
          <div className={styles.title}>
            <HttpContent
              request={podcastMetadata}
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
    />
  );
};

const mapDispatchToProps = {
  fetchClipsForPodcast: thunks.fetchClipsForPodcast,
  fetchPodcastMetadata: thunks.fetchPodcastMetadata,
};

const mapStateToProps = (state: AppState) => ({
  episodes: state.podcast.episodes,
  podcastMetadata: state.podcast.metadata,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PodcastPage);
