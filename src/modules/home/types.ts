import { LazyLoadedData } from 'types'
import { ClipMetadata } from '../clip/types'

export type HomeState = {
  hotClips: LazyLoadedData<ClipMetadata[]>
  page: number
  end: boolean
}
