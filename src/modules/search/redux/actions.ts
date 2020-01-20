import { createAction } from 'redux/createAction'
import { ActionsUnion } from 'redux/types'
import { SearchResult, SearchType, SearchParams, SearchResultsData } from '../types'

export enum ActionTypes {
  SetSearchResults = 'search/set_results',
  ExecuteSearch = 'search/execute',
  ErrorSearchResults = 'search/error',
}

export const actions = {
  setSearchRequest: (payload: { type: SearchType } & SearchResultsData<SearchResult>) =>
    createAction(ActionTypes.SetSearchResults, payload),
  executeSearch: (payload: SearchParams) => createAction(ActionTypes.ExecuteSearch, payload),
  errorSearchResults: (payload: { type: SearchType; message: string }) =>
    createAction(ActionTypes.ErrorSearchResults, payload),
}

export type Actions = ActionsUnion<typeof actions>
