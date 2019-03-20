import { createAction } from '~/redux/createAction';
import { ActionsUnion } from '~/redux/types';
import { SearchState } from '../types';

export enum ActionTypes {
  Clear = 'search/clear',
  SetSuggestions = 'search/set_suggestions',
}

export const actions = {
  setSuggestions: (suggestions: SearchState['suggestions']) =>
    createAction(ActionTypes.SetSuggestions, suggestions),
};

export type Actions = ActionsUnion<typeof actions>;
