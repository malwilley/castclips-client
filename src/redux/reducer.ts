import { combineReducers } from 'redux';
import podcast from '~/modules/Podcast/redux';

const reducer = combineReducers({
  podcast,
});

export default reducer;
