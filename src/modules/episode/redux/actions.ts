import { createAction } from 'redux/createAction'
import { ActionsUnion } from 'redux/types'
import { EpisodeState } from '../types'
import { AddClipPayload } from 'api/types'

export enum ActionTypes {
  FetchEpisodeClips = 'episode/fetch_clips',
  SetClipId = 'episode/set_clip_id',
  SetClips = 'episode/set_clips',
  SetMetadata = 'episode/set_metadata',
  CreateClip = 'episode/create_clip',
  FetchEpisode = 'episode/fetch',
}

export const actions = {
  fetchEpisode: (payload: string) => createAction(ActionTypes.FetchEpisode, payload),
  setClips: (clips?: EpisodeState['clips']) => createAction(ActionTypes.SetClips, clips),
  setMetadata: (metadata?: EpisodeState['metadata']) =>
    createAction(ActionTypes.SetMetadata, metadata),
  fetchEpisodeClips: (payload: string) => createAction(ActionTypes.FetchEpisodeClips, payload),
  createClip: (payload: AddClipPayload) => createAction(ActionTypes.CreateClip, payload),
}

export type Actions = ActionsUnion<typeof actions>
