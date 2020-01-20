import { ActionTypes } from './actions'
import { combineReducers } from 'redux'
import makeHttpReducer from 'redux/utils/setHttpStateReducer'
import { EpisodeState } from '../types'

const clips = makeHttpReducer<EpisodeState['clips']>(ActionTypes.SetClips)
const metadata = makeHttpReducer<EpisodeState['metadata']>(ActionTypes.SetMetadata)

const reducer = combineReducers({
  clips,
  metadata,
})

export default reducer
