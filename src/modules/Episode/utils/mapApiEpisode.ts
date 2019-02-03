import { EpisodeMetadata } from '../types';
import { ListenNotesEpisodeDataResponse } from '~/api/listenNotes';
import { pick } from 'ramda';

const mapApiEpisode = ({
  audio,
  audio_length,
  podcast,
  id,
  pub_date_ms,
  description,
  thumbnail,
  title,
}: ListenNotesEpisodeDataResponse): EpisodeMetadata => ({
  audio,
  audioLength: audio_length,
  podcast: pick(['id', 'title', 'description', 'thumbnail', 'website'], podcast),
  id,
  published: new Date(pub_date_ms),
  description,
  thumbnail,
  title,
});

export default mapApiEpisode;
