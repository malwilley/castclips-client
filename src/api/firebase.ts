import * as qs from 'querystringify';
import firebase from '~/modules/auth/firebase';

const host = 'https://us-central1-castclips-7c579.cloudfunctions.net/api';

export type GetClipResponse = {
  audio: string;
  description: string;
  end: number;
  episode: {
    id: string;
    title: string;
    description: string;
    audioLength: number;
    published: string;
  };
  podcast: { id: string; title: string; description: string; thumbnail: string };
  published: string;
  stars: number;
  start: number;
  title: string;
  views: number;
};

export type AddClipPayload = {
  audio: string;
  description: string;
  end: number;
  episode: { id: string; title: string; description: string; audioLength: number; published: Date };
  podcast: { id: string; title: string; description: string; thumbnail: string };
  start: number;
  title: string;
};

export type GetClipsForPodcastResponse = Array<{
  audio: string;
  description: string;
  id: string;
  end: number;
  episode: {
    id: string;
    title: string;
    description: string;
    audioLength: number;
    published: string;
  };
  published: string;
  stars: number;
  start: number;
  title: string;
  views: number;
}>;

export type GetClipsForEpisodeResponse = Array<{
  audio: string;
  description: string;
  id: string;
  end: number;
  published: string;
  stars: number;
  start: number;
  title: string;
  views: number;
}>;

type AddClipResponse = {
  id: string;
};

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
  const result = await fetchFirebase<GetClipsForPodcastResponse>(
    `/podcast/${podcastId}/clips/`,
    ''
  );

  return result;
};
