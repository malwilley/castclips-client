import { createAction } from 'redux/createAction'
import { ActionsUnion } from 'redux/types'
import { HomeState } from '../types'
import { ClipMetadata } from 'modules/clip/types'

export enum ActionTypes {
  AddHotClips = 'home/add_hot_clips',
  FetchMoreHotClips = 'home/fetch_more_hot_clips',
  SetHotClips = 'home/set_hot_clips',
  SetPage = 'home/set_page',
}

export const actions = {
  addHotClips: (clips: ClipMetadata[]) => createAction(ActionTypes.AddHotClips, clips),
  fetchMoreHotClips: () => createAction(ActionTypes.FetchMoreHotClips),
  setHotClips: (clips: HomeState['hotClips']) => createAction(ActionTypes.SetHotClips, clips),
  setPage: (page: HomeState['page']) => createAction(ActionTypes.SetPage, page),
}

export type Actions = ActionsUnion<typeof actions>
