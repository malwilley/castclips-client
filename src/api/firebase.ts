import * as qs from 'querystringify';
import {
  GetClipResponse,
  AddClipResponse,
  AddClipPayload,
  GetClipsForEpisodeResponse,
  GetClipsForPodcastResponse,
  PodcastSuggestionResponse,
  PodcastMetadataResponse,
  EpisodeMetadataResponse,
  PodcastEpisodeResponse,
} from './types';

const host = 'https://us-central1-castclips-7c579.cloudfunctions.net/api';

const fetchFirebase = async <TResponse>(
  route: string,
  token?: string,
  options: RequestInit = {}
): Promise<TResponse> => {
  const response = await fetch(host + route, {
    ...options,
    headers: token
      ? {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        }
      : options.headers,
  });

  return response.json();
};

export const getClip = async (id: string) => {
  const result = await fetchFirebase<GetClipResponse>(`/clip/${id}`);

  return result;
};

export const addClip = async (clip: AddClipPayload, token: string) => {
  const result = await fetchFirebase<AddClipResponse>('/clip/', token, {
    body: JSON.stringify(clip),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'post',
  });

  return result;
};

export const getClipsForEpisode = async (episodeId: string) => {
  const result = await fetchFirebase<GetClipsForEpisodeResponse>(
    `/episode/${episodeId}/clips/`,
    ''
  );

  return result;
};

export const getClipsForPodcast = async (podcastId: string) => {
  const result = await fetchFirebase<GetClipsForPodcastResponse[]>(
    `/podcast/${podcastId}/clips/`,
    ''
  );

  return result;
};

export const typeahead = async (query: string) => {
  const result = await fetchFirebase<PodcastSuggestionResponse>(`/typeahead`);

  return result;
};

export const getPodcastData = async (id: string) => {
  const result = await fetchFirebase<PodcastMetadataResponse>(`/podcasts/${id}`);

  return result;
};

export const getEpisodeData = async (id: string) => {
  const result = await fetchFirebase<EpisodeMetadataResponse>(`/episodes/${id}`);

  return result;
};

export const getNextEpisodes = async (podcastId: string, lastEpisodePublished: number) => {
  const result = await fetchFirebase<PodcastEpisodeResponse[]>(
    `/podcast/${podcastId}/episodes?${qs.stringify({ lastPublished: lastEpisodePublished })}`
  );

  return result;
};
