import { Thunk } from '~/redux/types';
import { actions } from './actions';
import { path } from 'ramda';
import { getPodcastData } from '~/api/listenNotes';
import mapApiPodcastEpisodes from '../utils/mapApiPodcastEpisode';
import mapApiPodcast from '../utils/mapApiPodcast';

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

export default {
  fetchPodcastMetadata,
};
