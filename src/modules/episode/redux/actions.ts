import { createAction } from 'src/redux/createAction';
import { ActionsUnion } from 'src/redux/types';
import { EpisodeState } from '../types';

export enum ActionTypes {
  SetClipId = 'episode/set_clip_id',
  SetClips = 'episode/set_clips',
  SetMetadata = 'episode/set_metadata',
}

export const actions = {
  setClipId: (clipId?: EpisodeState['view']['clipId']) =>
    createAction(ActionTypes.SetClipId, clipId),
  setClips: (clips?: EpisodeState['clips']) => createAction(ActionTypes.SetClips, clips),
  setMetadata: (metadata?: EpisodeState['metadata']) =>
    createAction(ActionTypes.SetMetadata, metadata),
};

export type Actions = ActionsUnion<typeof actions>;
