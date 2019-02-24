import { createAction } from '~/redux/createAction';
import { ActionsUnion } from '~/redux/types';
import { AuthState } from '../types';

export enum ActionTypes {
  SetUser = 'auth/set_user',
}

export const actions = {
  setUser: (user: AuthState['user']) => createAction(ActionTypes.SetUser, user),
};

export type Actions = ActionsUnion<typeof actions>;
