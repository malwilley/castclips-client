import { combineReducers } from 'redux';
import auth from '~/modules/auth/redux';
import clip from '~/modules/Clip/redux';
import episode from '~/modules/Episode/redux';
import podcast from '~/modules/Podcast/redux';
import home from '~/modules/home/redux';
import search from '~/modules/search/redux';
import { connectRouter } from 'connected-react-router';
import history from './history';

const reducer = combineReducers({
  auth,
  clip,
  episode,
  home,
  podcast,
  router: connectRouter(history),
  search,
});

export default reducer;
