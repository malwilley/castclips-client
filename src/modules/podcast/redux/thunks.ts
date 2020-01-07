import { Thunk } from 'redux/types'
import { actions } from './actions'
import mapApiPodcastEpisodes from '../utils/mapApiPodcastEpisode'
import mapApiPodcast from '../utils/mapApiPodcast'
import { PodcastEpisode, PodcastMetadata } from '../types'
import { path } from 'ramda'
import { getClipsForPodcast, getPodcastData, search } from 'api/firebase'
import { getAuthToken } from 'modules/auth/firebase'
import { SearchType } from 'modules/search/types'

const fetchPodcastMetadata: Thunk<string, Promise<void>> = id => async (dispatch, getState) => {
  const currentlyLoadedPodcast = path(['podcast', 'metadata', 'data', 'id'], getState())
  if (currentlyLoadedPodcast === id) {
    return
  }

  dispatch(actions.setMetadata({ type: 'fetching' }))
  dispatch(actions.setEpisodes({ type: 'fetching', data: [] }))

  try {
    const token = await getAuthToken()
    const metadata = await getPodcastData(token, id)
    dispatch(actions.setMetadata({ type: 'success', data: mapApiPodcast(metadata) }))
    dispatch(actions.addEpisodes(mapApiPodcastEpisodes(metadata.episodes)))
    dispatch(actions.setEpisodeSearchOffset(metadata.nextEpisodePubDate))
  } catch {
    dispatch(actions.setMetadata({ type: 'error', message: 'Error fetching podcast metadata' }))
  }
}

const searchEpisodes: Thunk<string, Promise<void>> = (query: string) => async (
  dispatch,
  getState
) => {
  const metadata = getState().podcast.metadata
  if (metadata.type !== 'success') {
    return
  }

  dispatch(actions.setEpisodeSearchTerm(query))
  dispatch(actions.setEpisodeSearchOffset(0))
  dispatch(actions.setEpisodes({ data: [], type: 'fetching' }))

  try {
    const token = await getAuthToken()
    const { results, nextOffset, total } = await search(token, {
      query,
      podcastId: metadata.data.id,
      type: SearchType.Episodes,
    })

    dispatch(
      actions.setEpisodes({
        type: nextOffset < total ? 'success' : 'end',
        data: mapApiPodcastEpisodes(results),
      })
    )

    dispatch(actions.setEpisodeSearchOffset(nextOffset))
  } catch {
    dispatch(
      actions.setEpisodes({
        type: 'error',
        data: [],
        message: 'Error searching episodes',
      })
    )
  }
}

const fetchMoreEpisodes: Thunk<undefined, Promise<void>> = () => async (dispatch, getState) => {
  const currentlyLoadedPodcast = path<PodcastMetadata>(['podcast', 'metadata', 'data'], getState())
  const currentlyLoadedEpisodes = path<PodcastEpisode[]>(
    ['podcast', 'episodes', 'data'],
    getState()
  )
  if (!currentlyLoadedPodcast || !currentlyLoadedEpisodes) {
    return
  }

  const query = getState().podcast.search.query
  const offset = getState().podcast.search.offset

  dispatch(actions.setEpisodes({ type: 'fetching', data: currentlyLoadedEpisodes }))

  try {
    const token = await getAuthToken()

    if (query) {
      const { results, nextOffset, total } = await search(token, {
        query,
        offset,
        podcastId: currentlyLoadedPodcast.id,
        type: SearchType.Episodes,
      })
      const newEpisodesList = [...currentlyLoadedEpisodes, ...mapApiPodcastEpisodes(results)]

      dispatch(
        actions.setEpisodes({
          type: nextOffset < total ? 'success' : 'end',
          data: newEpisodesList,
        })
      )

      dispatch(actions.setEpisodeSearchOffset(nextOffset))
    } else {
      const { nextEpisodePubDate, episodes } = await getPodcastData(
        token,
        currentlyLoadedPodcast.id,
        offset
      )
      const newEpisodesList = [...currentlyLoadedEpisodes, ...mapApiPodcastEpisodes(episodes)]

      nextEpisodePubDate
        ? dispatch(actions.setEpisodes({ type: 'success', data: newEpisodesList }))
        : dispatch(actions.setEpisodes({ type: 'end', data: newEpisodesList }))

      dispatch(actions.setEpisodeSearchOffset(nextEpisodePubDate))
    }
  } catch {
    dispatch(
      actions.setEpisodes({
        type: 'error',
        data: currentlyLoadedEpisodes,
        message: 'Error fetching new episodes',
      })
    )
  }
}

const clearSearch: Thunk<undefined, Promise<void>> = () => async (dispatch, getState) => {
  const currentlyLoadedPodcast = path<PodcastMetadata>(['podcast', 'metadata', 'data'], getState())
  if (!currentlyLoadedPodcast) {
    return
  }

  dispatch(actions.setEpisodeSearchTerm(''))
  dispatch(actions.setEpisodes({ type: 'fetching', data: [] }))

  try {
    const token = await getAuthToken()
    const { nextEpisodePubDate, episodes } = await getPodcastData(token, currentlyLoadedPodcast.id)
    const newEpisodesList = mapApiPodcastEpisodes(episodes)

    nextEpisodePubDate
      ? dispatch(actions.setEpisodes({ type: 'success', data: newEpisodesList }))
      : dispatch(actions.setEpisodes({ type: 'end', data: newEpisodesList }))

    dispatch(actions.setEpisodeSearchOffset(nextEpisodePubDate))
  } catch {
    dispatch(
      actions.setEpisodes({
        type: 'error',
        data: [],
        message: 'Error fetching new episodes',
      })
    )
  }
}

const fetchClipsForPodcast: Thunk<string, Promise<void>> = id => async (dispatch, getState) => {
  const currentlyLoadedPodcast = path(['podcast', 'metadata', 'data', 'id'], getState())
  if (currentlyLoadedPodcast === id && getState().podcast.clips.type === 'success') {
    return
  }

  dispatch(actions.setClips({ type: 'fetching' }))

  try {
    const clips = await getClipsForPodcast(id)
    dispatch(
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
    dispatch(actions.setClips({ type: 'error', message: 'Error fetching podcast metadata' }))
  }
}

export default {
  clearSearch,
  searchEpisodes,
  fetchClipsForPodcast,
  fetchMoreEpisodes,
  fetchPodcastMetadata,
}
