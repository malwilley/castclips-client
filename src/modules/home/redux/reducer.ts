import { Actions, ActionTypes } from './actions'
import { combineReducers, Reducer } from 'redux'
import { HomeState } from '../types'
import { propOr } from 'ramda'
import { ClipMetadata } from 'modules/clip/types'

const hotClips: Reducer<HomeState['hotClips']> = (
  state = { type: 'not_asked' },
  action: Actions
) => {
  switch (action.type) {
    case ActionTypes.AddHotClips: {
      const loadedClips: ClipMetadata[] = propOr([], 'data', state)
      return {
        type: 'success',
        data: [...loadedClips, ...action.payload],
      }
    }
    case ActionTypes.FetchMoreHotClips:
      return {
        type: 'fetching',
        data: propOr([], 'data', state),
      }
    case ActionTypes.SetHotClips:
      return action.payload
    default:
      return state
  }
}

const page: Reducer<HomeState['page']> = (state = 1, action: Actions) => {
  switch (action.type) {
    case ActionTypes.SetPage:
      return action.payload
    default:
      return state
  }
}

const reducer = combineReducers({
  hotClips,
  page,
})

export default reducer
