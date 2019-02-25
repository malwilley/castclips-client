import { Thunk } from '~/redux/types';
import { actions } from './actions';
import { path } from 'ramda';
import { getEpisodeData } from '~/api/listenNotes';
import mapApiEpisode from '../utils/mapApiEpisode';
import { AddClipPayload, addClip, getClipsForEpisode } from '~/api/firebase';
import { push } from 'connected-react-router';
import firebase from '~/modules/auth/firebase';

const fetchClips: Thunk<string, Promise<void>> = id => async (dispatch, getState) => {
  const currentlyLoadedClips = path(['episode', 'clips', 'data', 'id'], getState());
  if (currentlyLoadedClips === id) {
    return;
  }

  dispatch(actions.setClips({ type: 'fetching' }));

  try {
    const clips = await getClipsForEpisode(id);
    dispatch(actions.setClips({ data: clips, type: 'success' }));
  } catch {
    dispatch(actions.setClips({ message: 'Error fetching clips', type: 'error' }));
  }
};

const createClip: Thunk<AddClipPayload> = clip => async (dispatch, getState) => {
  const user = getState().auth.user;
  if (user.type === 'loggedout') {
    await firebase.auth().signInAnonymously();
  }
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
  fetchClips,
  createClip,
  fetchEpisodeMetadata,
};
