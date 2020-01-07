import { combineReducers } from 'redux'
import { AuthState } from '../types'
import { Actions, ActionTypes } from './actions'

const user = (state: AuthState['user'] = { type: 'loggedout', data: null }, action: Actions) => {
  switch (action.type) {
    case ActionTypes.SetUser:
      return action.payload
    default:
      return state
  }
}

const reducer = combineReducers({
  user,
})

export default reducer
