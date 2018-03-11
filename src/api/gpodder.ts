import { GpodderPodcastResponse } from '../types';

const host = 'https://gpodder.net/';

export async function searchPodcasts(query: string): Promise<GpodderPodcastResponse[]> {
  const response = await fetch(`${host}search.json?q=${query}`);
  
  if (response.ok) {
    return response.json();
  }

  throw new Error(response.statusText);
}