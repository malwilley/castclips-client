import { LazyLoadedData } from 'src/types';
import { ClipMetadata } from '../clip/types';

export type HomeState = {
  hotClips: LazyLoadedData<ClipMetadata[]>;
  page: number;
};
