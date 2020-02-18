import { actions, ActionTypes } from '../redux'
import { call, select, put, takeLatest } from 'redux-saga/effects'
import { getPodcastMetadataUnion } from '../selectors'
import { waitForToken } from 'modules/auth/sagas/waitForToken'
import { search } from 'api/firebase'
import mapApiPodcastEpisodes from '../utils/mapApiPodcastEpisode'
import { SearchType } from 'modules/search/types'

export function* searchPodcastEpisodes(action: ReturnType<typeof actions.searchPodcastEpisodes>) {
  const { payload: query } = action
  const metadata = yield select(getPodcastMetadataUnion)
  if (metadata.type !== 'success') {
    return
  }

  try {
    const token = yield call(waitForToken)
    const { results, nextOffset, total } = yield call(search, token, {
      query,
      podcastId: metadata.data.id,
      type: SearchType.Episodes,
    })

    yield put(
      actions.setEpisodes({
        type: nextOffset < total ? 'success' : 'end',
        data: mapApiPodcastEpisodes(results),
      })
    )

    yield put(actions.setEpisodeSearchOffset(nextOffset))
  } catch {
    yield put(
      actions.setEpisodes({
        type: 'error',
        data: [],
        message: 'Error searching episodes',
      })
    )
  }
}

export function* watchSearchPodcastEpisodes() {
  yield takeLatest(ActionTypes.SearchPodcastEpisodes, searchPodcastEpisodes)
}
