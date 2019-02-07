import { createAction } from '~/redux/createAction';
import { ActionsUnion } from '~/redux/types';
import { EpisodeState } from '../types';

export enum ActionTypes {
  SetClipId = 'episode/set_clip_id',
  SetMetadata = 'episode/set_metadata',
}

export const actions = {
  setClipId: (clipId: EpisodeState['view']['clipId']) =>
    createAction(ActionTypes.SetClipId, clipId),
  setMetadata: (metadata: EpisodeState['metadata']) =>
    createAction(ActionTypes.SetMetadata, metadata),
};

export type Actions = ActionsUnion<typeof actions>;
