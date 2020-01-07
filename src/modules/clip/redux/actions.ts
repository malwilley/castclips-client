import { createAction } from 'redux/createAction'
import { ActionsUnion } from 'redux/types'
import { ClipState } from '../types'

export enum ActionTypes {
  SetMetadata = 'clip/set_metadata',
  SetLikeState = 'clip/set_like_state',
}

export const actions = {
  setMetadata: (metadata: ClipState['metadata']) => createAction(ActionTypes.SetMetadata, metadata),
  setLikeState: (likeState: boolean) => createAction(ActionTypes.SetLikeState, likeState),
}

export type Actions = ActionsUnion<typeof actions>
