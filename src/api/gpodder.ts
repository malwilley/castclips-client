import { get } from './common';
import { GpodderPodcastResponse, GpodderEpisodeResponse } from '../types';

const host = 'https://gpodder.net/';

export function searchPodcasts(query: string): Promise<GpodderPodcastResponse[]> {
  return get<GpodderPodcastResponse[]>(
    `${host}search.json?q=${query}`
  );
}

export function getEpisodeData(podcastUrl: string, episodeUrl: string): Promise<GpodderEpisodeResponse> {
  return get<GpodderEpisodeResponse>(
    `${host}api/2/data/episode.json?podcast-url=${podcastUrl}&episode-url=${episodeUrl}`
  );
}