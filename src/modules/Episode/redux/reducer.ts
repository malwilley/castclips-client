import { Actions, ActionTypes } from './actions';
import { EpisodeState } from '../types';
import { combineReducers } from 'redux';

const metadata = (state: EpisodeState['metadata'] = { type: 'not_asked' }, action: Actions) => {
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
