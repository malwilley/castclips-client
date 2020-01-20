import { Actions, ActionTypes } from './actions'
import { combineReducers } from 'redux'
import {
  SearchType,
  SearchResult,
  SearchResults,
  PodcastResult,
  ClipResult,
  EpisodeResult,
} from '../types'
import { path } from 'ramda'

const makeResultReducer = <T extends SearchResult>(type: SearchType) => (
  state: SearchResults<T> = { type: 'not_asked' },
  action: Actions
): SearchResults<T> => {
  if (path(['payload', 'type'], action) !== type) {
    return state
  }

  switch (action.type) {
    case ActionTypes.ErrorSearchResults:
      return { type: 'error', message: action.payload.message }
    case ActionTypes.ExecuteSearch:
      return { type: 'fetching' }
    case ActionTypes.SetSearchResults:
      return {
        type: 'success',
        data: { results: action.payload.results, total: action.payload.total },
      } as SearchResults<T>
    default:
      return state
  }
}

const reducer = combineReducers({
  [SearchType.Podcasts]: makeResultReducer<PodcastResult>(SearchType.Podcasts),
  [SearchType.Episodes]: makeResultReducer<EpisodeResult>(SearchType.Episodes),
  [SearchType.Clips]: makeResultReducer<ClipResult>(SearchType.Clips),
})

export default reducer
