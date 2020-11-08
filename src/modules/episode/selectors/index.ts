import { AppState } from 'redux/types'
import { createSelector } from 'reselect'
import HttpUnion from 'utils/HttpUnion'
import Maybe from 'utils/Maybe'

const getEpisodeState = (state: AppState) => state.episode

export const getEpisodeClipsUnion = createSelector(getEpisodeState, (state) => state.clips)
export const getEpisodeClipsData = createSelector(getEpisodeClipsUnion, HttpUnion.unwrap)

export const getEpisodeUnion = createSelector(getEpisodeState, (state) => state.metadata)
export const getEpisodeData = createSelector(getEpisodeUnion, HttpUnion.unwrap)
export const getEpisodeId = createSelector(
  getEpisodeData,
  Maybe.map(({ id }) => id)
)
