import { createAction } from 'src/redux/createAction';
import { ActionsUnion } from 'src/redux/types';
import { SearchResults, SearchResult, SearchType } from '../types';

export enum ActionTypes {
  SetSearchResults = 'search/set_results',
}

export const actions = {
  setSearchRequest: (payload: { type: SearchType; request: SearchResults<SearchResult> }) =>
    createAction(ActionTypes.SetSearchResults, payload),
};

export type Actions = ActionsUnion<typeof actions>;
