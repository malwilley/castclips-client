import { Thunk } from 'src/redux/types';
import { actions } from './actions';
import { path } from 'ramda';
import { getClip, unlikeClip as unlikeClipApi, likeClip as likeClipApi } from 'src/api/firebase';
import mapClipResponse from '../utils/mapClipResponse';
import { getAuthToken } from 'src/modules/auth/firebase';
import { ConsoleIcon } from 'mdi-react';

const fetchClip: Thunk<string, Promise<void>> = id => async (dispatch, getState) => {
  const currentlyLoadedClip = path(['clip', 'metadata', 'data', 'id'], getState());
  if (currentlyLoadedClip === id) {
    return;
  }

  dispatch(actions.setMetadata({ type: 'fetching' }));

  try {
    const token = await getAuthToken();
    const clip = await getClip(id, token);
    dispatch(
      actions.setMetadata({
        type: 'success',
        data: mapClipResponse(clip),
      })
    );
  } catch {
    dispatch(actions.setMetadata({ type: 'error', message: 'Error fetching episode metadata' }));
  }
};

const likeClip: Thunk<string, Promise<void>> = id => async (dispatch, getState) => {
  dispatch(actions.setLikeState(true));

  try {
    const token = await getAuthToken();
    await likeClipApi(id, token);
  } catch (e) {
    console.log(e);
    dispatch(actions.setLikeState(false));
    // todo: show error notification
  }
};

const unlikeClip: Thunk<string, Promise<void>> = id => async (dispatch, getState) => {
  dispatch(actions.setLikeState(false));

  try {
    const token = await getAuthToken();
    await unlikeClipApi(id, token);
  } catch (e) {
    console.log(e);
    dispatch(actions.setLikeState(true));
    // todo: show error notification
  }
};

export default {
  fetchClip,
  likeClip,
  unlikeClip,
};
