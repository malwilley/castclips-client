import { ListenNotesPodcastDataResponse } from '~/api/listenNotes';
import { PodcastEpisode } from '../types';

const mapApiPodcastEpisodes = (
  listenNotesEpisodes: ListenNotesPodcastDataResponse['episodes']
): PodcastEpisode[] =>
  listenNotesEpisodes.map(({ description, thumbnail, title, pub_date_ms, audio_length, id }) => ({
    description,
    audioLength: audio_length,
    id,
    published: new Date(pub_date_ms),
    thumbnail,
    title,
  }));

export default mapApiPodcastEpisodes;
