import { Thunk } from '~/redux/types';
import { actions } from './actions';
import last from 'ramda/es/last';
import { getPodcastData, getNextEpisodes } from '~/api/listenNotes';
import mapApiPodcastEpisodes from '../utils/mapApiPodcastEpisode';
import mapApiPodcast from '../utils/mapApiPodcast';
import { PodcastEpisode } from '../types';
import path from 'ramda/es/path';

const fetchPodcastMetadata: Thunk<string, Promise<void>> = id => async (dispatch, getState) => {
  const currentlyLoadedPodcast = path(['podcast', 'metadata', 'data', 'id'], getState());
  if (currentlyLoadedPodcast === id) {
    return;
  }

  dispatch(actions.setMetadata({ type: 'fetching' }));
  dispatch(actions.setEpisodes({ type: 'fetching', data: [] }));

  try {
    const metadata = await getPodcastData(id);
    dispatch(actions.setMetadata({ type: 'success', data: mapApiPodcast(metadata) }));
    dispatch(actions.addEpisodes(mapApiPodcastEpisodes(metadata.episodes)));
  } catch {
    dispatch(actions.setMetadata({ type: 'error', message: 'Error fetching podcast metadata' }));
  }
};

const fetchMoreEpisodes: Thunk<undefined, Promise<void>> = () => async (dispatch, getState) => {
  const currentlyLoadedPodcastId = path<string>(['podcast', 'metadata', 'data', 'id'], getState());
  const currentlyLoadedEpisodes = path<PodcastEpisode[]>(
    ['podcast', 'episodes', 'data'],
    getState()
  );
  if (!currentlyLoadedPodcastId || !Array.isArray(currentlyLoadedEpisodes)) {
    return;
  }

  dispatch(actions.setEpisodes({ type: 'fetching', data: currentlyLoadedEpisodes }));

  try {
    const lastEpisode = last(currentlyLoadedEpisodes)!;
    const nextEpisodes = await getNextEpisodes(
      currentlyLoadedPodcastId,
      lastEpisode.published.getTime()
    );
    const newEpisodesList = [...currentlyLoadedEpisodes, ...mapApiPodcastEpisodes(nextEpisodes)];

    nextEpisodes.length >= 10
      ? dispatch(actions.setEpisodes({ type: 'success', data: newEpisodesList }))
      : dispatch(actions.setEpisodes({ type: 'end', data: newEpisodesList }));
  } catch {
    dispatch(
      actions.setEpisodes({
        type: 'error',
        data: currentlyLoadedEpisodes,
        message: 'Error fetching new episodes',
      })
    );
  }
};

export default {
  fetchMoreEpisodes,
  fetchPodcastMetadata,
};
