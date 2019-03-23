import * as qs from 'querystringify';
import { Thunk } from '~/redux/types';
import { actions } from './actions';
import { push } from 'connected-react-router';
import { getAuthToken } from '~/modules/auth/firebase';
import { typeahead, search } from '~/api/firebase';

const clearSuggestions: Thunk<void, void> = () => async dispatch => {
  dispatch(actions.setSuggestions({ type: 'not_asked' }));
};

const executeSearch: Thunk<string, Promise<void>> = query => async dispatch => {
  dispatch(push(`/search?${qs.stringify({ q: query })}`));
};

const fetchSuggestions: Thunk<string, Promise<void>> = query => async (dispatch, getState) => {
  if (!query) {
    dispatch(actions.setSuggestions({ type: 'success', data: [] }));
  }

  try {
    const token = await getAuthToken(getState());
    const { terms } = await typeahead(token, query);
    dispatch(actions.setSuggestions({ type: 'success', data: terms }));
  } catch {
    dispatch(actions.setSuggestions({ type: 'error', message: 'Error fetching suggestions' }));
  }
};

const fetchSearchResults: Thunk<string, Promise<void>> = query => async (dispatch, getState) => {
  const searchType = getState().search.type;
  dispatch(actions.setSearchResults({ type: 'fetching' }));

  try {
    const token = await getAuthToken(getState());
    const { results } = await search(token, searchType, query);
    dispatch(actions.setSearchResults({ type: 'success', data: results }));
  } catch {
    dispatch(actions.setSearchResults({ type: 'error', message: 'Error fetching search results' }));
  }
};

export default {
  clearSuggestions,
  executeSearch,
  fetchSearchResults,
  fetchSuggestions,
};
