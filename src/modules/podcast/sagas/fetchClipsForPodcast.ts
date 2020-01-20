import { actions, ActionTypes } from '../redux'
import { call, select, put, takeLatest } from 'redux-saga/effects'
import { getPodcastMetadataId, getPodcastClips } from '../selectors'
import { getClipsForPodcast } from 'api/firebase'
import { GetClipsForPodcastResponse } from 'api/types'

export function* fetchClipsForPodcast(action: ReturnType<typeof actions.fetchClipsForPodcast>) {
  const { payload: id } = action
  const currentlyLoadedPodcastId = yield select(getPodcastMetadataId)
  const clipsState = yield select(getPodcastClips)
  if (currentlyLoadedPodcastId === id && clipsState.type === 'success') {
    return
  }

  yield put(actions.setClips({ type: 'fetching' }))

  try {
    const clips: GetClipsForPodcastResponse = yield call(getClipsForPodcast, id)
    yield put(
      actions.setClips({
        type: 'success',
        data: clips.map(
          ({
            episode: { published: episodePublished, ...episode },
            createdAt,
            published,
            ...rest
          }) => ({
            ...rest,
            createdAt: new Date(createdAt),
            published: new Date(published),
            episode: {
              ...episode,
              published: new Date(episodePublished),
            },
          })
        ),
      })
    )
  } catch {
    yield put(actions.setClips({ type: 'error', message: 'Error fetching podcast metadata' }))
  }
}

export function* watchFetchClipsForPodcast() {
  yield takeLatest(
    [ActionTypes.FetchPodcastMetadata, ActionTypes.FetchClipsForPodcast],
    fetchClipsForPodcast
  )
}
