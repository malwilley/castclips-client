import { PodcastMetadata } from '../types';
import { PodcastMetadataResponse } from 'src/api/types';

const mapApiPodcast = ({ episodes, ...podcast }: PodcastMetadataResponse): PodcastMetadata =>
  podcast;

export default mapApiPodcast;
