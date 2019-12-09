import { createAction } from 'redux/createAction';
import { ActionsUnion } from 'redux/types';
import { PodcastEpisode, PodcastState } from '../types';

export enum ActionTypes {
  AddEpisodes = 'podcast/add_episodes',
  SetClips = 'podcast/set_clips',
  SetEpisodes = 'podcast/set_episodes',
  SetMetadata = 'podcast/set_metadata',
  SetEpisodeSearchTerm = 'podcast/set_episode_search_term',
  SetEpisodeSearchOffset = 'podcast/set_episode_search_offset',
}

export const actions = {
  addEpisodes: (episodes: PodcastEpisode[]) => createAction(ActionTypes.AddEpisodes, episodes),
  setClips: (clips: PodcastState['clips']) => createAction(ActionTypes.SetClips, clips),
  setEpisodes: (episodes: PodcastState['episodes']) =>
    createAction(ActionTypes.SetEpisodes, episodes),
  setMetadata: (metadata: PodcastState['metadata']) =>
    createAction(ActionTypes.SetMetadata, metadata),
  setEpisodeSearchTerm: (query: PodcastState['search']['query']) =>
    createAction(ActionTypes.SetEpisodeSearchTerm, query),
  setEpisodeSearchOffset: (offset: PodcastState['search']['offset']) =>
    createAction(ActionTypes.SetEpisodeSearchOffset, offset),
};

export type Actions = ActionsUnion<typeof actions>;
