import * as qs from 'querystringify';
import {
  GetClipResponse,
  AddClipResponse,
  AddClipPayload,
  GetClipsForEpisodeResponse,
  GetClipsForPodcastResponse,
  PodcastMetadataResponse,
  EpisodeMetadataResponse,
  TypeaheadResponse,
  SearchResultsResponse,
  GetHotClipsResponse,
} from './types';
import { SearchType } from 'modules/search/types';
import config from 'config';
import { stringify } from 'querystringify';

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

export const search = async (
  token: string,
  {
    type,
    query,
    offset = 0,
    podcastId,
    episodeId,
  }: { type: SearchType; query: string; offset?: number; podcastId?: string; episodeId?: string }
) => {
  const results = await fetchFirebase<SearchResultsResponse<any>>(
    `/search?${qs.stringify({ q: query, type, offset, podcastId, episodeId })}`,
    token
  );

  return results;
};

export const getPodcastData = async (token: string, id: string, nextEpisodePubDate?: number) => {
  const result = await fetchFirebase<PodcastMetadataResponse>(
    `/podcast/${id}${stringify(nextEpisodePubDate ? { nextEpisodePubDate } : {}, true)}`,
    token
  );

  return result;
};

export const getEpisodeData = async (token: string, id: string) => {
  const result = await fetchFirebase<EpisodeMetadataResponse>(`/episode/${id}`, token);

  return result;
};
