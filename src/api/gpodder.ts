import { GpodderPodcastResponse } from '../types';

const host = 'https://gpodder.net/';

export function searchPodcasts(query: string): Promise<GpodderPodcastResponse[]> {
  return fetch(`${host}search.json?q=${query}`)
    .then(response => response.json())
    .catch(console.error);
}