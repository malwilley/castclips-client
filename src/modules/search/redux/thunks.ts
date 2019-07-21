import * as qs from 'querystringify';
import { Thunk } from 'src/redux/types';
import { push } from 'connected-react-router';
import { SearchType, SearchParams } from '../types';

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

export default {
  executeSearch,
  setSearch,
};
