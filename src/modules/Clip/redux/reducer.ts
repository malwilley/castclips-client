import { Actions, ActionTypes } from './actions';
import { combineReducers } from 'redux';
import { ClipState } from '../types';

const metadata = (state: ClipState['metadata'] = { type: 'not_asked' }, action: Actions) => {
  switch (action.type) {
    case ActionTypes.SetMetadata:
      return action.payload;
    default:
      return state;
  }
};

const reducer = combineReducers({
  metadata,
});

export default reducer;
