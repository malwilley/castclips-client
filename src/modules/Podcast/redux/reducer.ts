import { Actions, ActionTypes } from './actions';
import { PodcastState, PodcastEpisode } from '../types';
import { combineReducers } from 'redux';
import { propOr } from 'ramda';
import makeHttpReducer from 'src/redux/utils/setHttpStateReducer';

const clips = makeHttpReducer<PodcastState['clips']>(ActionTypes.SetClips);

const episodes = (state: PodcastState['episodes'] = { type: 'not_asked' }, action: Actions) => {
  switch (action.type) {
    case ActionTypes.AddEpisodes: {
      const loadedEpisodes: PodcastEpisode[] = propOr([], 'data', state);
      return {
        type: 'success',
        data: [...loadedEpisodes, ...action.payload],
      } as PodcastState['episodes'];
    }
    case ActionTypes.SetEpisodes:
      return action.payload;
    default:
      return state;
  }
};

const metadata = makeHttpReducer<PodcastState['metadata']>(ActionTypes.SetMetadata);

const reducer = combineReducers({
  clips,
  episodes,
  metadata,
});

export default reducer;
