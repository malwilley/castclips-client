import { createAction } from 'src/redux/createAction';
import { ActionsUnion } from 'src/redux/types';
import { AuthState } from '../types';

export enum ActionTypes {
  SetUser = 'auth/set_user',
}

export const actions = {
  setUser: (user: AuthState['user']) => createAction(ActionTypes.SetUser, user),
};

export type Actions = ActionsUnion<typeof actions>;
