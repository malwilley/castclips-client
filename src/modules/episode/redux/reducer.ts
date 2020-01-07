import { ActionTypes } from './actions'
import { combineReducers } from 'redux'
import makeHttpReducer from 'redux/utils/setHttpStateReducer'
import { EpisodeState } from '../types'

const clips = makeHttpReducer<EpisodeState['clips']>(ActionTypes.SetClips)
const metadata = makeHttpReducer<EpisodeState['metadata']>(ActionTypes.SetMetadata)
const clipId = makeHttpReducer<EpisodeState['view']['clipId']>(ActionTypes.SetClipId)

const view = combineReducers({ clipId })

const reducer = combineReducers({
  clips,
  metadata,
  view,
})

export default reducer
