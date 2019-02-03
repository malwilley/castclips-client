import { Thunk } from '~/redux/types';
import { actions } from './actions';
import { path } from 'ramda';
import { getEpisodeData } from '~/api/listenNotes';
import mapApiEpisode from '../utils/mapApiEpisode';

const fetchEpisodeMetadata: Thunk<string, Promise<void>> = id => async (dispatch, getState) => {
  const currentlyLoadedEpisode = path(['episode', 'metadata', 'data', 'id'], getState());
  if (currentlyLoadedEpisode === id) {
    return;
  }

  dispatch(actions.setMetadata({ type: 'fetching' }));

  try {
    const metadata = await getEpisodeData(id);
    dispatch(actions.setMetadata({ type: 'success', data: mapApiEpisode(metadata) }));
  } catch {
    dispatch(actions.setMetadata({ type: 'error', message: 'Error fetching episode metadata' }));
  }
};

export default {
  fetchEpisodeMetadata,
};
