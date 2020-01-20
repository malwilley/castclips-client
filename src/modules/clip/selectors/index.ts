import { AppState } from 'redux/types'
import { createSelector } from 'reselect'
import Maybe from 'utils/Maybe'

const getClipState = (state: AppState) => state.clip

export const getClipData = createSelector(getClipState, state =>
  state.metadata.type === 'success' ? state.metadata.data : null
)

export const getClipId = createSelector(
  getClipData,
  Maybe.map(({ id }) => id)
)
