import { Thunk } from '~/redux/types';
import { actions } from './actions';
import mapClipResponse from '~/modules/Clip/utils/mapClipResponse';
import { getHotClips } from '~/api/firebase';

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
