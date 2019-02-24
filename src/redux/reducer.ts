import { combineReducers } from 'redux';
import auth from '~/modules/auth/redux';
import clip from '~/modules/Clip/redux';
import episode from '~/modules/Episode/redux';
import podcast from '~/modules/Podcast/redux';
import { connectRouter } from 'connected-react-router';
import history from './history';

const reducer = combineReducers({
  auth,
  clip,
  episode,
  podcast,
  router: connectRouter(history),
});

export default reducer;
