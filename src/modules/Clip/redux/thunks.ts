import { Thunk } from '~/redux/types';
import { actions } from './actions';
import { path } from 'ramda';
import { getClip } from '~/api/firebase';

const fetchClip: Thunk<string, Promise<void>> = id => async (dispatch, getState) => {
  const currentlyLoadedClip = path(['clip', 'metadata', 'data', 'id'], getState());
  if (currentlyLoadedClip === id) {
    return;
  }

  dispatch(actions.setMetadata({ type: 'fetching' }));

  try {
    const data = await getClip(id);
    dispatch(actions.setMetadata({ type: 'success', data }));
  } catch {
    dispatch(actions.setMetadata({ type: 'error', message: 'Error fetching episode metadata' }));
  }
};

export default {
  fetchClip,
};
