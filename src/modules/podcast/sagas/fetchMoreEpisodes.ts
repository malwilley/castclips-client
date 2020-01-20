import { actions, ActionTypes } from '../redux'
import { call, select, put, takeLatest } from 'redux-saga/effects'
import {
  getPodcastSearchOffset,
  getPodcastSearchQuery,
  getPodcastMetadataData,
  getPodcastEpisodesData,
} from '../selectors'
import { waitForToken } from 'modules/auth/sagas/waitForToken'
import { search, getPodcastData } from 'api/firebase'
import mapApiPodcastEpisodes from '../utils/mapApiPodcastEpisode'
import { SearchType } from 'modules/search/types'

export function* fetchMoreEpisodes() {
  const currentlyLoadedPodcast = yield select(getPodcastMetadataData)
  const currentlyLoadedEpisodes = yield select(getPodcastEpisodesData)
  if (!currentlyLoadedPodcast || !currentlyLoadedEpisodes) {
    return
  }

  const query = yield select(getPodcastSearchQuery)
  const offset = yield select(getPodcastSearchOffset)

  yield put(actions.setEpisodes({ type: 'fetching', data: currentlyLoadedEpisodes }))

  try {
    const token = yield call(waitForToken)

    if (query) {
      const { results, nextOffset, total } = yield call(search, token, {
        query,
        offset,
        podcastId: currentlyLoadedPodcast.id,
        type: SearchType.Episodes,
      })
      const newEpisodesList = [...currentlyLoadedEpisodes, ...mapApiPodcastEpisodes(results)]

      yield put(
        actions.setEpisodes({
          type: nextOffset < total ? 'success' : 'end',
          data: newEpisodesList,
        })
      )

      yield put(actions.setEpisodeSearchOffset(nextOffset))
    } else {
      const { nextEpisodePubDate, episodes } = yield call(
        getPodcastData,
        token,
        currentlyLoadedPodcast.id,
        offset
      )
      const newEpisodesList = [...currentlyLoadedEpisodes, ...mapApiPodcastEpisodes(episodes)]

      nextEpisodePubDate
        ? yield put(actions.setEpisodes({ type: 'success', data: newEpisodesList }))
        : yield put(actions.setEpisodes({ type: 'end', data: newEpisodesList }))

      yield put(actions.setEpisodeSearchOffset(nextEpisodePubDate))
    }
  } catch {
    yield put(
      actions.setEpisodes({
        type: 'error',
        data: currentlyLoadedEpisodes,
        message: 'Error fetching new episodes',
      })
    )
  }
}

export function* watchFetchMoreEpisodes() {
  yield takeLatest(ActionTypes.FetchMorePodcastEpisodes, fetchMoreEpisodes)
}
