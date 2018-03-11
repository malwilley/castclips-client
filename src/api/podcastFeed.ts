import { get } from './common';
import { PodcastData } from '../types';

const endpoint = 'https://r4kjdi4fjc.execute-api.us-east-1.amazonaws.com/dev/parseFeed';

export function parseFeed (feedUrl: string): Promise<PodcastData> {
  return get<PodcastData>(`${endpoint}?feedUrl=${feedUrl}`);
}