import { call, takeLatest, put } from 'redux-saga/effects'
import { ActionTypes, actions } from '../redux/actions'
import { waitForToken } from 'modules/auth/sagas/waitForToken'
import { search } from 'api/firebase'
import makeMapSearchResult from '../utils/mapSearchResult'

export function* executeSearch(action: ReturnType<typeof actions.executeSearch>) {
  const {
    payload: { page, type, query },
  } = action
  try {
    const token = yield call(waitForToken)
    const { results, total } = yield call(search, token, { type, query, page })
    yield put(
      actions.setSearchRequest({
        type,
        total,
        results: results.map(makeMapSearchResult(type)),
      })
    )
  } catch {
    yield put(
      actions.errorSearchResults({
        type,
        message: `Error searching ${type}s`,
      })
    )
  }
}

export function* watchExecuteSearch() {
  yield takeLatest(ActionTypes.ExecuteSearch, executeSearch)
}
