import { createAction } from '~/redux/createAction';
import { ActionsUnion } from '~/redux/types';
import { SearchState } from '../types';

export enum ActionTypes {
  Clear = 'search/clear',
  SetSearchResults = 'search/set_results',
  SetSearchType = 'search/set_type',
  SetSuggestions = 'search/set_suggestions',
}

export const actions = {
  setSearchResults: (results: SearchState['results']) =>
    createAction(ActionTypes.SetSearchResults, results),
  setSearchType: (searchType: SearchState['type']) =>
    createAction(ActionTypes.SetSearchType, searchType),
  setSuggestions: (suggestions: SearchState['suggestions']) =>
    createAction(ActionTypes.SetSuggestions, suggestions),
};

export type Actions = ActionsUnion<typeof actions>;
