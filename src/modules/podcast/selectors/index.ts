import { AppState } from 'redux/types'
import { createSelector } from 'reselect'
import Maybe from 'utils/Maybe'
import extractSuccessData from 'utils/extractSuccessData'

const getPodcastState = (state: AppState) => state.podcast

export const getPodcastMetadataUnion = createSelector(getPodcastState, state => state.metadata)

export const getPodcastMetadataData = createSelector(getPodcastMetadataUnion, extractSuccessData)

export const getPodcastMetadataId = createSelector(
  getPodcastMetadataData,
  Maybe.map(state => state.id)
)

export const getPodcastSearchState = createSelector(getPodcastState, state => state.search)

export const getPodcastSearchQuery = createSelector(getPodcastSearchState, state => state.query)
export const getPodcastSearchOffset = createSelector(getPodcastSearchState, state => state.offset)

export const getPodcastEpisodesUnion = createSelector(getPodcastState, state => state.episodes)
export const getPodcastEpisodesData = createSelector(getPodcastEpisodesUnion, state =>
  state.type === 'not_asked' ? null : state.data
)

export const getPodcastClips = createSelector(getPodcastState, state => state.clips)
