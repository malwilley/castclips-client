import { combineReducers } from 'redux';
import episode from '~/modules/Episode/redux';
import podcast from '~/modules/Podcast/redux';

const reducer = combineReducers({
  episode,
  podcast,
});

export default reducer;
