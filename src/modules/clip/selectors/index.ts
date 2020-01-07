import { AppState } from 'redux/types'
import { createSelector } from 'reselect'

const getClipState = (state: AppState) => state.clip

export const getClipData = createSelector(getClipState, state =>
  state.metadata.type === 'success' ? state.metadata.data : null
)
