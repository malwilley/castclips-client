import { Thunk } from '~/redux/types';
import { actions } from './actions';
import { path } from 'ramda';
import mapApiEpisode from '../utils/mapApiEpisode';
import { addClip, getClipsForEpisode, getEpisodeData } from '~/api/firebase';
import { push } from 'connected-react-router';
import { getAuthToken } from '~/modules/auth/firebase';
import { AddClipPayload } from '~/api/types';

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

const createClip: Thunk<AddClipPayload> = clip => async (dispatch, getState) => {
  dispatch(actions.setClipId({ type: 'fetching' }));

  try {
    const token = await getAuthToken(getState());
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
    const token = await getAuthToken(getState());
    const metadata = await getEpisodeData(token, id);
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
