import { Thunk } from 'src/redux/types';
import { actions } from './actions';
import mapClipResponse from 'src/modules/clip/utils/mapClipResponse';
import { getHotClips } from 'src/api/firebase';

const fetchHotClips: Thunk<number, Promise<void>> = () => async (dispatch, getState) => {
  dispatch(actions.fetchMoreHotClips());
  const page = getState().home.page;

  try {
    // const token = await getAuthToken();
    const clips = await getHotClips(page);
    dispatch(actions.setPage(page + 1));
    dispatch(actions.addHotClips(clips.map(mapClipResponse)));
  } catch {
    // todo: notifications
    dispatch(actions.addHotClips([]));
  }
};

export default {
  fetchHotClips,
};
