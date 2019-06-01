import { createAction } from 'src/redux/createAction';
import { ActionsUnion } from 'src/redux/types';
import { SearchState } from '../types';

export enum ActionTypes {
  Clear = 'search/clear',
  SetSearchResults = 'search/set_results',
  SetSuggestions = 'search/set_suggestions',
}

export const actions = {
  setSearchResults: (results: SearchState['results']) =>
    createAction(ActionTypes.SetSearchResults, results),
  setSuggestions: (suggestions: SearchState['suggestions']) =>
    createAction(ActionTypes.SetSuggestions, suggestions),
};

export type Actions = ActionsUnion<typeof actions>;
