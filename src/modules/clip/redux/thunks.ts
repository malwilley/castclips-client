import { Thunk } from 'redux/types';
import { actions } from './actions';
import { actions as modalActions } from 'modules/modal/redux/actions';
import { path } from 'ramda';
import {
  getClip,
  unlikeClip as unlikeClipApi,
  likeClip as likeClipApi,
  editClip as editClipApi,
  deleteClip as deleteClipApi,
} from 'api/firebase';
import mapClipResponse from '../utils/mapClipResponse';
import { getAuthToken } from 'modules/auth/firebase';
import { ClipMetadata } from '../types';
import { getClipData } from '../selectors';
import { push } from 'connected-react-router';

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

const editClip: Thunk<
  Pick<ClipMetadata, 'id' | 'start' | 'end' | 'title' | 'description'>,
  Promise<void>
> = clip => async (dispatch, getState) => {
  const currentlyLoadedClip = getClipData(getState());

  if (!currentlyLoadedClip) {
    return;
  }

  const { id: clipId, ...data } = clip;
  dispatch(modalActions.modalSend());

  try {
    const token = await getAuthToken();
    await editClipApi({ clipId, token, data });
    dispatch(
      actions.setMetadata({
        type: 'success',
        data: {
          ...currentlyLoadedClip,
          ...clip,
        },
      })
    );
    dispatch(modalActions.modalSuccess());
  } catch (e) {
    console.log(e);
    dispatch(modalActions.modalError('Failed to modify clip.'));
    // todo: show error notification
  }
};

const deleteClip: Thunk<string, Promise<void>> = clipId => async (dispatch, getState) => {
  const currentlyLoadedClip = getClipData(getState());

  if (!currentlyLoadedClip) {
    return;
  }

  dispatch(modalActions.modalSend());

  try {
    const token = await getAuthToken();
    await deleteClipApi({ clipId, token });
    dispatch(push(`/episode/${currentlyLoadedClip.episode.id}`));
  } catch (e) {
    console.log(e);
    dispatch(modalActions.modalError('Failed to delete clip.'));
    // todo: show error notification
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
  editClip,
  deleteClip,
  fetchClip,
  likeClip,
  unlikeClip,
};
