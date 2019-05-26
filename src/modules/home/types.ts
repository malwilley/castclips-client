import { LazyLoadedData } from '~/types';
import { ClipMetadata } from '../Clip/types';

export type HomeState = {
  hotClips: LazyLoadedData<ClipMetadata>;
  page: number;
};
