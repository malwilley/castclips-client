import * as qs from 'querystringify';

const host = 'https://us-central1-castclips-7c579.cloudfunctions.net';

type GetClipResponse = {
  audio: string;
  description: string;
  end: number;
  episodeId: string;
  podcastId: string;
  stars: number;
  start: number;
  title: string;
  views: number;
};

type AddClipPayload = {
  audio: string;
  description: string;
  end: number;
  episodeId: string;
  podcastId: string;
  start: number;
  title: string;
};

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
