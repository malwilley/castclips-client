import { Thunk } from '~/redux/types';
import { actions } from './actions';
import { path } from 'ramda';
import { getEpisodeData } from '~/api/listenNotes';
import mapApiEpisode from '../utils/mapApiEpisode';
import { AddClipPayload, addClip, getClipsForEpisode } from '~/api/firebase';
import { push } from 'connected-react-router';
import firebase from '~/modules/auth/firebase';
import { AuthState } from '~/modules/auth/types';

const fetchClips: Thunk<string, Promise<void>> = id => async (dispatch, getState) => {
  // todo: wtf is this
  const currentlyLoadedClips = path(['episode', 'clips', 'data', 'id'], getState());
  if (currentlyLoadedClips === id) {
    return;
  }

  dispatch(actions.setClips({ type: 'fetching' }));

  try {
    const clips = await getClipsForEpisode(id);
    dispatch(
      actions.setClips({
        data: clips.map(clip => ({ ...clip, published: new Date(clip.published) })),
        type: 'success',
      })
    );
  } catch {
    dispatch(actions.setClips({ message: 'Error fetching clips', type: 'error' }));
  }
};

const signInAnonymouslyAndGetToken = async () => {
  const { user } = await firebase.auth().signInAnonymouslyAndRetrieveData();
  if (!user) {
    throw new Error('Failed to login');
  }

  const token = await user.getIdToken();
  return token;
};

const createClip: Thunk<AddClipPayload> = clip => async (dispatch, getState) => {
  dispatch(actions.setClipId({ type: 'fetching' }));

  try {
    const userState = getState().auth.user;
    const token =
      userState.type === 'loggedout'
        ? await signInAnonymouslyAndGetToken()
        : await userState.user.getIdToken();
    const { id } = await addClip(clip, token);
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
