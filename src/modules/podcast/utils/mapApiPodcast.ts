import { PodcastMetadata } from '../types'
import { PodcastMetadataResponse } from 'api/types'

const mapApiPodcast = ({ episodes, ...podcast }: PodcastMetadataResponse): PodcastMetadata =>
  podcast

export default mapApiPodcast
