import { PodcastData } from '../types';

const endpoint = 'https://r4kjdi4fjc.execute-api.us-east-1.amazonaws.com/dev/parseFeed';

export async function parseFeed (feedUrl: string): Promise<PodcastData> {
  const response = await fetch(`${endpoint}?feedUrl=${feedUrl}`);

  if (response.ok) {
    return response.json();
  }
  
  throw new Error('response.statusText');
}