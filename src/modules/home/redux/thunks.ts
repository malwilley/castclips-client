import { Thunk } from 'redux/types'
import { actions } from './actions'
import mapClipResponse from 'modules/clip/utils/mapClipResponse'
import { getHotClips } from 'api/firebase'

const fetchHotClips: Thunk<void, Promise<void>> = () => async (dispatch, getState) => {
  dispatch(actions.fetchMoreHotClips())
  const page = getState().home.page

  try {
    const clips = await getHotClips(page)
    dispatch(actions.setPage({ page: page + 1, end: clips.length !== 20 }))
    dispatch(actions.addHotClips(clips.map(mapClipResponse)))
  } catch {
    dispatch(actions.errorHotClips('Error fetching clips'))
  }
}

export default {
  fetchHotClips,
}
