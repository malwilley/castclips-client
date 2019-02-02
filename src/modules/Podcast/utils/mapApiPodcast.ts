import { ListenNotesPodcastDataResponse } from '~/api/listenNotes';
import { PodcastMetadata } from '../types';

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
  description,
  website,
});

export default mapApiPodcast;
