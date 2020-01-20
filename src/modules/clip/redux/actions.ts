import { createAction } from 'redux/createAction'
import { ActionsUnion } from 'redux/types'
import { ClipState, ClipMetadata } from '../types'

export enum ActionTypes {
  FetchClip = 'clip/fetch',
  SetMetadata = 'clip/set_metadata',
  SetLikeState = 'clip/set_like_state',
  LikeClip = 'clip/like',
  DeleteClip = 'clip/delete',
  EditClip = 'clip/edit',
}

export const actions = {
  setMetadata: (metadata: ClipState['metadata']) => createAction(ActionTypes.SetMetadata, metadata),
  setLikeState: (likeState: boolean) => createAction(ActionTypes.SetLikeState, likeState),
  likeClip: (payload: { clipId: string; like: boolean }) =>
    createAction(ActionTypes.LikeClip, payload),
  deleteClip: (payload: string) => createAction(ActionTypes.DeleteClip, payload),
  editClip: (payload: Pick<ClipMetadata, 'id' | 'start' | 'end' | 'title' | 'description'>) =>
    createAction(ActionTypes.EditClip, payload),
  fetchClip: (payload: string) => createAction(ActionTypes.FetchClip, payload),
}

export type Actions = ActionsUnion<typeof actions>
