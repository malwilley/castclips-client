import { LazyLoadedData } from 'src/types';
import { ClipMetadata } from '../Clip/types';

export type HomeState = {
  hotClips: LazyLoadedData<ClipMetadata[]>;
  page: number;
};
