import { combineReducers } from 'redux';
import clip from '~/modules/Clip/redux';
import episode from '~/modules/Episode/redux';
import podcast from '~/modules/Podcast/redux';

const reducer = combineReducers({
  clip,
  episode,
  podcast,
});

export default reducer;
