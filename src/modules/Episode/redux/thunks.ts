import { Thunk } from '~/redux/types';
import { actions } from './actions';
import { path } from 'ramda';
import { getEpisodeData } from '~/api/listenNotes';
import mapApiEpisode from '../utils/mapApiEpisode';
import { AddClipPayload, addClip } from '~/api/firebase';
import { push } from 'connected-react-router';

const createClip: Thunk<AddClipPayload> = clip => async (dispatch, getState) => {
  dispatch(actions.setClipId({ type: 'fetching' }));

  try {
    const { id } = await addClip(clip);
    dispatch(actions.setClipId({ data: id, type: 'success' }));
    dispatch(push(`/clip/${id}`));
  } catch {
    dispatch(actions.setClipId({ message: 'Error creating clip', type: 'error' }));
  }
};

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
  createClip,
  fetchEpisodeMetadata,
};
