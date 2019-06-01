import { ActionTypes } from './actions';
import { combineReducers } from 'redux';
import makeHttpReducer from 'src/redux/utils/setHttpStateReducer';
import { SearchState } from '../types';

const results = makeHttpReducer<SearchState['results']>(ActionTypes.SetSearchResults);
const suggestions = makeHttpReducer<SearchState['suggestions']>(ActionTypes.SetSuggestions);

const reducer = combineReducers({
  results,
  suggestions,
});

export default reducer;
