import { createAction } from '~/redux/createAction';
import { ActionsUnion } from '~/redux/types';
import { EpisodeState } from '../types';

export enum ActionTypes {
  SetMetadata = 'episode/set_metadata',
}

export const actions = {
  setMetadata: (metadata: EpisodeState['metadata']) =>
    createAction(ActionTypes.SetMetadata, metadata),
};

export type Actions = ActionsUnion<typeof actions>;
