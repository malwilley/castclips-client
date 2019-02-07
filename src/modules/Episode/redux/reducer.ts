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

const view = (state: EpisodeState['view'] = { clipId: { type: 'not_asked' } }, action: Actions) => {
  switch (action.type) {
    case ActionTypes.SetClipId:
      return {
        ...state,
        clipId: action.payload,
      };
    default:
      return state;
  }
};

const reducer = combineReducers({
  metadata,
  view,
});

export default reducer;
