import * as qs from 'querystringify';
import config from '~/config';

const host = 'https://listennotes.p.mashape.com/api/v1';

export type ListenNotesTypeaheadResponse = {
  podcasts: Array<{
    id: string;
    thumbnail: string;
    title_original: string;
  }>;
  terms: string[];
};

export type ListenNotesPodcastDataResponse = {
  thumbnail: string;
  description: string;
  id: string;
  next_episode_pub_date: number;
  title: string;
  total_episodes: number;
  episodes: Array<{
    description: string;
    thumbnail: string;
    title: string;
    pub_date_ms: number;
    audio_length: number;
    audio: string;
    id: string;
  }>;
  publisher: string;
  website: string;
};

export type ListenNotesEpisodeDataResponse = {
  description: string;
  title: string;
  podcast: {
    title: string;
    description: string;
    thumbnail: string;
    id: string;
    website: string;
  };
  id: string;
  audio: string;
  thumbnail: string;
  pub_date_ms: number;
  audio_length: number;
};

const fetchListenNotes = async <TResponse>(
  route: string,
  options: RequestInit = {}
): Promise<TResponse> => {
  const { headers } = options;
  const response = await fetch(host + route, {
    ...options,
    headers: {
      ...headers,
      Accept: 'application/json',
      'X-Mashape-Key': config.listenNotesApiKey,
    },
  });

  return response.json();
};

export const typeahead = async (query: string) => {
  const result = await fetchListenNotes<ListenNotesTypeaheadResponse>(
    `/typeahead?${qs.stringify({ q: query, show_podcasts: 1 })}`
  );

  return result;
};

export const getPodcastData = async (id: string) => {
  const result = await fetchListenNotes<ListenNotesPodcastDataResponse>(
    `/podcasts/${id}?${qs.stringify({ sort: 'recent_first' })}`
  );

  return result;
};

export const getEpisodeData = async (id: string) => {
  const result = await fetchListenNotes<ListenNotesEpisodeDataResponse>(`/episodes/${id}`);

  return result;
};

export const getNextEpisodes = async (podcastId: string, lastEpisodePublished: number) => {
  const result = await fetchListenNotes<ListenNotesPodcastDataResponse>(
    `/podcasts/${podcastId}?${qs.stringify({
      next_episode_pub_date: lastEpisodePublished,
      sort: 'recent_first',
    })}`
  );

  return result.episodes;
};
