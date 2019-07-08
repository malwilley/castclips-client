import * as qs from 'querystringify';
import {
  GetClipResponse,
  AddClipResponse,
  AddClipPayload,
  GetClipsForEpisodeResponse,
  GetClipsForPodcastResponse,
  PodcastMetadataResponse,
  EpisodeMetadataResponse,
  PodcastEpisodeResponse,
  TypeaheadResponse,
  SearchResultsResponse,
  GetHotClipsResponse,
} from './types';
import { SearchType } from 'src/modules/search/types';
import config from 'src/config';

const host = config.firebase.apiHost;

const fetchFirebase = async <TResponse>(
  route: string,
  token?: string,
  options: RequestInit = {}
): Promise<TResponse> => {
  const response = await fetch(host + route, {
    ...options,
    headers: token
      ? {
          ...(options.headers || {}),
          Authorization: `Bearer ${token}`,
        }
      : options.headers,
  });

  return response.json();
};

export const getClip = async (id: string, token: string) => {
  const result = await fetchFirebase<GetClipResponse>(`/clip/${id}`, token);

  return result;
};

export const addClip = async (clip: AddClipPayload, token: string) => {
  const result = await fetchFirebase<AddClipResponse>('/clip/', token, {
    body: JSON.stringify(clip),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });

  return result;
};

export const likeClip = async (clipId: string, token: string) => {
  await fetchFirebase(`/clip/${clipId}/like`, token, { method: 'POST' });
};

export const unlikeClip = async (clipId: string, token: string) => {
  await fetchFirebase(`/clip/${clipId}/like`, token, { method: 'DELETE' });
};

export const getHotClips = async (page: number) => {
  const result = await fetchFirebase<GetHotClipsResponse>(`/clip/hot?${qs.stringify({ page })}`);

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
  const result = await fetchFirebase<GetClipsForPodcastResponse>(
    `/podcast/${podcastId}/clips/`,
    ''
  );

  return result;
};

export const typeahead = async (token: string, query: string) => {
  const result = await fetchFirebase<TypeaheadResponse>(
    `/typeahead?${qs.stringify({ q: query })}`,
    token
  );

  return result;
};

export const search = async (token: string, type: SearchType, query: string) => {
  const results = await fetchFirebase<SearchResultsResponse<any>>(
    `/search?${qs.stringify({ q: query, type })}`,
    token
  );

  return results;
};

export const getPodcastData = async (token: string, id: string) => {
  const result = await fetchFirebase<PodcastMetadataResponse>(`/podcast/${id}`, token);

  return result;
};

export const getEpisodeData = async (token: string, id: string) => {
  const result = await fetchFirebase<EpisodeMetadataResponse>(`/episode/${id}`, token);

  return result;
};

export const getNextEpisodes = async (
  token: string,
  podcastId: string,
  lastEpisodePublished: number
) => {
  const result = await fetchFirebase<PodcastEpisodeResponse[]>(
    `/podcast/${podcastId}/episodes?${qs.stringify({ lastPublished: lastEpisodePublished })}`,
    token
  );

  return result;
};
