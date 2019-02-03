import { ListenNotesPodcastDataResponse } from '~/api/listenNotes';
import { PodcastEpisode } from '../types';
import stripHtml from '~/utils/stripHtml';

const mapApiPodcastEpisodes = (
  listenNotesEpisodes: ListenNotesPodcastDataResponse['episodes']
): PodcastEpisode[] =>
  listenNotesEpisodes.map(({ description, thumbnail, title, pub_date_ms, audio_length, id }) => ({
    description: stripHtml(description),
    audioLength: audio_length,
    id,
    published: new Date(pub_date_ms),
    thumbnail,
    title,
  }));

export default mapApiPodcastEpisodes;
