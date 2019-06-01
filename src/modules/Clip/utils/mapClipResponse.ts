import { GetClipResponse } from 'src/api/types';

const mapClipResponse = (clipResponse: GetClipResponse) => ({
  ...clipResponse,
  episode: {
    ...clipResponse.episode,
    published: new Date(clipResponse.episode.published),
  },
  published: new Date(clipResponse.published),
});

export default mapClipResponse;
