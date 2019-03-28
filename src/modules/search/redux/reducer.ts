import { actions } from './actions';
import { combineReducers } from 'redux';
import makeHttpReducer from '~/redux/utils/setHttpStateReducer';

const results = makeHttpReducer(actions.setSearchResults);
const suggestions = makeHttpReducer(actions.setSuggestions);

const reducer = combineReducers({
  results,
  suggestions,
});

export default reducer;
