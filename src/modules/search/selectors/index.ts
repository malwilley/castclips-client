import { AppState } from 'redux/types'
import { createSelector } from 'reselect'

const getSearchState = (state: AppState) => state.search

export const getClipSearch = createSelector(getSearchState, (state) => state.clip)
export const getPodcastSearch = createSelector(getSearchState, (state) => state.podcast)
export const getEpisodeSearch = createSelector(getSearchState, (state) => state.episode)
