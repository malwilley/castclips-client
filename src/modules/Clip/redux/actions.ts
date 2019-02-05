import { createAction } from '~/redux/createAction';
import { ActionsUnion } from '~/redux/types';
import { ClipState } from '../types';

export enum ActionTypes {
  SetMetadata = 'clip/set_metadata',
}

export const actions = {
  setMetadata: (metadata: ClipState['metadata']) => createAction(ActionTypes.SetMetadata, metadata),
};

export type Actions = ActionsUnion<typeof actions>;
