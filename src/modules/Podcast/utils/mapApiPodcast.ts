import { ListenNotesPodcastDataResponse } from '~/api/listenNotes';
import { PodcastMetadata } from '../types';

const mapApiPodcast = ({
  id,
  thumbnail,
  title,
  description,
  publisher,
  total_episodes,
  website,
}: ListenNotesPodcastDataResponse): PodcastMetadata => ({
  id,
  thumbnail,
  title,
  description,
  publisher,
  totalEpisodes: total_episodes,
  website,
});

export default mapApiPodcast;
