import * as qs from 'querystringify';

const host = 'https://us-central1-castclips-7c579.cloudfunctions.net';

export type GetClipResponse = {
  audio: string;
  description: string;
  end: number;
  episode: { id: string; title: string; description: string; audioLength: number; published: Date };
  podcast: { id: string; title: string; description: string; thumbnail: string };
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

export type GetClipsForEpisodeResponse = Array<GetClipResponse & { id: string }>;

type AddClipResponse = {
  id: string;
};

const fetchFirebase = async <TResponse>(
  route: string,
  options: RequestInit = {}
): Promise<TResponse> => {
  const response = await fetch(host + route, options);

  return response.json();
};

export const getClip = async (id: string) => {
  const result = await fetchFirebase<GetClipResponse>(`/getClip?${qs.stringify({ id })}`);

  return result;
};

export const addClip = async (clip: AddClipPayload) => {
  const result = await fetchFirebase<AddClipResponse>('/addClip', {
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
    `/getClipsForEpisode?${qs.stringify({ id: episodeId })}`
  );

  return result;
};
