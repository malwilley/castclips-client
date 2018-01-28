import { GetClipResponse } from 'src/api/types';
import { ClipMetadata } from '../types';

const mapClipResponse = (clipResponse: GetClipResponse): ClipMetadata => ({
  ...clipResponse,
  episode: {
    ...clipResponse.episode,
    published: new Date(clipResponse.episode.published),
  },
  published: new Date(clipResponse.published),
});

export default mapClipResponse;
