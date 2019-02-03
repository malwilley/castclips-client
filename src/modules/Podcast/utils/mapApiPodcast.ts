import { ListenNotesPodcastDataResponse } from '~/api/listenNotes';
import { PodcastMetadata } from '../types';
import stripHtml from '~/utils/stripHtml';

const mapApiPodcast = ({
  id,
  thumbnail,
  title,
  description,
  website,
}: ListenNotesPodcastDataResponse): PodcastMetadata => ({
  id,
  thumbnail,
  title,
  description: stripHtml(description),
  website,
});

export default mapApiPodcast;
