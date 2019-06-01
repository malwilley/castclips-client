import { EpisodeMetadata } from '../types';
import { pick } from 'ramda';
import { EpisodeMetadataResponse } from 'src/api/types';

const mapApiEpisode = ({
  podcast,
  published,
  ...rest
}: EpisodeMetadataResponse): EpisodeMetadata => ({
  ...rest,
  podcast: pick(['id', 'title', 'description', 'thumbnail', 'website'], podcast),
  published: new Date(published),
});

export default mapApiEpisode;
