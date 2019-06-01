import { combineReducers } from 'redux';
import auth from 'src/modules/auth/redux';
import clip from 'src/modules/Clip/redux';
import episode from 'src/modules/Episode/redux';
import podcast from 'src/modules/Podcast/redux';
import home from 'src/modules/home/redux';
import search from 'src/modules/search/redux';
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
