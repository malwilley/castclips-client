import { all, spawn } from 'redux-saga/effects'
import { updateAuthState } from 'modules/auth/sagas/updateAuthState'
import clipSagas from 'modules/clip/sagas'
import episodeSagas from 'modules/episode/sagas'
import homeSagas from 'modules/home/sagas'
import podcastSagas from 'modules/podcast/sagas'
import searchSagas from 'modules/search/sagas'

const sagas = [
  updateAuthState,
  ...clipSagas,
  ...episodeSagas,
  ...homeSagas,
  ...podcastSagas,
  ...searchSagas,
]

function* rootSaga() {
  yield all(sagas.map(spawn))
}

export default rootSaga
