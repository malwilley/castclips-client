import { createAction } from '~/redux/createAction';
import { ActionsUnion } from '~/redux/types';
import { PodcastEpisode, PodcastState } from '../types';

export enum ActionTypes {
  AddEpisodes = 'podcast/add_episodes',
  SetEpisodes = 'podcast/set_episodes',
  SetMetadata = 'podcast/set_metadata',
}

export const actions = {
  addEpisodes: (episodes: PodcastEpisode[]) => createAction(ActionTypes.AddEpisodes, episodes),
  setEpisodes: (episodes: PodcastState['episodes']) =>
    createAction(ActionTypes.SetEpisodes, episodes),
  setMetadata: (metadata: PodcastState['metadata']) =>
    createAction(ActionTypes.SetMetadata, metadata),
};

export type Actions = ActionsUnion<typeof actions>;
