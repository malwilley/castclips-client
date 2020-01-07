import { createAction } from 'redux/createAction'
import { ActionsUnion } from 'redux/types'
import { SearchResults, SearchResult, SearchType } from '../types'

export enum ActionTypes {
  SetSearchResults = 'search/set_results',
}

export const actions = {
  setSearchRequest: (payload: { type: SearchType; request: SearchResults<SearchResult> }) =>
    createAction(ActionTypes.SetSearchResults, payload),
}

export type Actions = ActionsUnion<typeof actions>
