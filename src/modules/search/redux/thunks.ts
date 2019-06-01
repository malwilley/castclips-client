import * as qs from 'querystringify';
import { Thunk } from 'src/redux/types';
import { actions } from './actions';
import { push } from 'connected-react-router';
import { getAuthToken } from 'src/modules/auth/firebase';
import { typeahead, search } from 'src/api/firebase';
import { SearchType, SearchParams } from '../types';
import makeMapSearchResult from '../utils/mapSearchResult';

const clearSuggestions: Thunk = () => async dispatch => {
  dispatch(actions.setSuggestions({ type: 'not_asked' }));
};

const executeSearch: Thunk<string, Promise<void>> = query => async (dispatch, getState) => {
  const type = (qs.parse(getState().router.location.search) as any).type || SearchType.Podcasts;
  dispatch(push(`/search?${qs.stringify({ q: query, type })}`));
};

const setSearch: Thunk<SearchParams, Promise<void>> = ({ query, type }) => async (
  dispatch,
  getState
) => {
  const q = query || (qs.parse(getState().router.location.search) as any).q;
  const computedType = type || (qs.parse(getState().router.location.search) as any).type;
  dispatch(push(`/search?${qs.stringify({ q, type: computedType })}`));
};

const fetchSuggestions: Thunk<string, Promise<void>> = query => async (dispatch, getState) => {
  if (!query) {
    dispatch(actions.setSuggestions({ type: 'success', data: [] }));
  }

  try {
    const token = await getAuthToken();
    const { terms } = await typeahead(token, query);
    dispatch(actions.setSuggestions({ type: 'success', data: terms }));
  } catch {
    dispatch(actions.setSuggestions({ type: 'error', message: 'Error fetching suggestions' }));
  }
};

const fetchSearchResults: Thunk<SearchParams, Promise<void>> = ({
  query,
  type = SearchType.Podcasts,
}) => async (dispatch, getState) => {
  dispatch(actions.setSearchResults({ type: 'fetching' }));

  try {
    if (!query) {
      dispatch(actions.setSearchResults({ type: 'success', data: [] }));
      return;
    }
    const token = await getAuthToken();
    const { results } = await search(token, type, query);
    dispatch(
      actions.setSearchResults({
        type: 'success',
        data: results.map(makeMapSearchResult(type)),
      })
    );
  } catch {
    dispatch(actions.setSearchResults({ type: 'error', message: 'Error fetching search results' }));
  }
};

export default {
  clearSuggestions,
  executeSearch,
  fetchSearchResults,
  fetchSuggestions,
  setSearch,
};
