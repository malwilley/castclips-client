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

const makeResultReducer = <T extends SearchResult>(type: SearchType) => (
  state: SearchResults<T> = { type: 'not_asked' },
  action: Actions
): SearchResults<T> => {
  switch (action.type) {
    case ActionTypes.SetSearchResults:
      return (action.payload.type === type ? action.payload.request : state) as SearchResults<T>
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
