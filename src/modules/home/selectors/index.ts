import { AppState } from 'redux/types'
import { createSelector } from 'reselect'

const getHomeState = (state: AppState) => state.home

export const getHotClips = createSelector(getHomeState, home => home.hotClips)
export const isEndOfClips = createSelector(getHomeState, home => home.end)
