import { createAction } from 'src/redux/createAction';
import { ActionsUnion } from 'src/redux/types';
import { PodcastEpisode, PodcastState } from '../types';

export enum ActionTypes {
  AddEpisodes = 'podcast/add_episodes',
  SetClips = 'podcast/set_clips',
  SetEpisodes = 'podcast/set_episodes',
  SetMetadata = 'podcast/set_metadata',
}

export const actions = {
  addEpisodes: (episodes: PodcastEpisode[]) => createAction(ActionTypes.AddEpisodes, episodes),
  setClips: (clips: PodcastState['clips']) => createAction(ActionTypes.SetClips, clips),
  setEpisodes: (episodes: PodcastState['episodes']) =>
    createAction(ActionTypes.SetEpisodes, episodes),
  setMetadata: (metadata: PodcastState['metadata']) =>
    createAction(ActionTypes.SetMetadata, metadata),
};

export type Actions = ActionsUnion<typeof actions>;
