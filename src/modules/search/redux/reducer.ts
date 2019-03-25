import { actions } from './actions';
import { combineReducers } from 'redux';
import makeHttpReducer from '~/redux/utils/setHttpStateReducer';
import makeSimpleSetReducer from '~/redux/utils/makeSimpleSetReducer';
import { SearchType } from '../types';

const results = makeHttpReducer(actions.setSearchResults);
const suggestions = makeHttpReducer(actions.setSuggestions);

const reducer = combineReducers({
  results,
  suggestions,
});

export default reducer;
