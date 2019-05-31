import { Actions, ActionTypes } from './actions';
import { combineReducers } from 'redux';
import { ClipState } from '../types';

const metadata = (state: ClipState['metadata'] = { type: 'not_asked' }, action: Actions) => {
  switch (action.type) {
    case ActionTypes.SetMetadata:
      return action.payload;
    case ActionTypes.SetLikeState:
      return state.type === 'success'
        ? {
            data: {
              ...state.data,
              likesCount: state.data.likesCount + (action.payload ? 1 : -1),
              userHasLiked: action.payload,
            },
            type: 'success',
          }
        : state;
    default:
      return state;
  }
};

const reducer = combineReducers({
  metadata,
});

export default reducer;
