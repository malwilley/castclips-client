import { ListenNotesPodcastDataResponse } from '~/api/listenNotes';
import { PodcastMetadata } from '../types';
import stripHtml from '~/utils/stripHtml';

const mapApiPodcast = ({
  id,
  thumbnail,
  title,
  description,
  total_episodes,
  website,
}: ListenNotesPodcastDataResponse): PodcastMetadata => ({
  id,
  thumbnail,
  title,
  description: stripHtml(description),
  totalEpisodes: total_episodes,
  website,
});

export default mapApiPodcast;
