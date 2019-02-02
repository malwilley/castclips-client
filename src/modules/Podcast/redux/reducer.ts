import { Actions, ActionTypes } from './actions';
import { PodcastState, PodcastEpisode } from '../types';
import { combineReducers } from 'redux';
import { propOr } from 'ramda';

const episodes = (state: PodcastState['episodes'] = { type: 'not_asked' }, action: Actions) => {
  switch (action.type) {
    case ActionTypes.AddEpisodes: {
      const loadedEpisodes: PodcastEpisode[] = propOr([], 'data', state);
      return {
        type: 'success',
        data: [...loadedEpisodes, ...action.payload],
      };
    }
    case ActionTypes.SetEpisodes:
      return action.payload;
    default:
      return state;
  }
};

const metadata = (state: PodcastState['metadata'] = { type: 'not_asked' }, action: Actions) => {
  switch (action.type) {
    case ActionTypes.SetMetadata:
      return action.payload;
    default:
      return state;
  }
};

const reducer = combineReducers({
  episodes,
  metadata,
});

export default reducer;
