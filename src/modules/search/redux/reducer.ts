import { actions } from './actions';
import { combineReducers } from 'redux';
import makeHttpReducer from '~/redux/utils/setHttpStateReducer';

const suggestions = makeHttpReducer(actions.setSuggestions);

const reducer = combineReducers({
  suggestions,
});

export default reducer;
