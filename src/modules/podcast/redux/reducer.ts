import { Actions, ActionTypes } from './actions'
import { PodcastState, PodcastEpisode } from '../types'
import { combineReducers } from 'redux'
import { propOr } from 'ramda'
import makeHttpReducer from 'redux/utils/setHttpStateReducer'

const clips = makeHttpReducer<PodcastState['clips']>(ActionTypes.SetClips)

const episodes = (state: PodcastState['episodes'] = { type: 'not_asked' }, action: Actions) => {
  switch (action.type) {
    case ActionTypes.AddEpisodes: {
      const loadedEpisodes: PodcastEpisode[] = propOr([], 'data', state)
      return {
        type: 'success',
        data: [...loadedEpisodes, ...action.payload],
      } as PodcastState['episodes']
    }
    case ActionTypes.SetEpisodes:
      return action.payload
    case ActionTypes.SearchPodcastEpisodes:
      return { data: [], type: 'fetching' } as PodcastState['episodes']
    default:
      return state
  }
}

const metadata = makeHttpReducer<PodcastState['metadata']>(ActionTypes.SetMetadata)

const query = (state: PodcastState['search']['query'] = '', action: Actions) => {
  switch (action.type) {
    case ActionTypes.SearchPodcastEpisodes:
      return action.payload
    case ActionTypes.ClearPodcastEpisodeSearch:
      return ''
    default:
      return state
  }
}

const offset = (state: PodcastState['search']['offset'] = 0, action: Actions) => {
  switch (action.type) {
    case ActionTypes.SetEpisodeSearchOffset:
      return action.payload
    case ActionTypes.SearchPodcastEpisodes:
      return 0
    default:
      return state
  }
}

const search = combineReducers({ query, offset })

const reducer = combineReducers({
  clips,
  episodes,
  metadata,
  search,
})

export default reducer
