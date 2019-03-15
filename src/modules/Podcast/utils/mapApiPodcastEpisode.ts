import { PodcastEpisode } from '../types';
import { PodcastEpisodeResponse } from '~/api/types';

const mapApiPodcastEpisodes = (episodes: PodcastEpisodeResponse[]): PodcastEpisode[] =>
  episodes.map(({ published, ...episode }) => ({
    ...episode,
    published: new Date(published),
  }));

export default mapApiPodcastEpisodes;
