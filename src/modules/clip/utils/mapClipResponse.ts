import { GetClipResponse } from 'api/types'
import { ClipMetadata } from '../types'

const mapClipResponse = (clipResponse: GetClipResponse): ClipMetadata => ({
  ...clipResponse,
  episode: {
    ...clipResponse.episode,
    published: new Date(clipResponse.episode.published),
  },
  createdAt: new Date(clipResponse.createdAt),
  published: new Date(clipResponse.published),
})

export default mapClipResponse
