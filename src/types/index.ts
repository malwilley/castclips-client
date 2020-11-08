export type NotAsked = {
  type: 'not_asked'
}

export type Success<T> = {
  type: 'success'
  data: T
}

export type Fetching = {
  type: 'fetching'
}

export type FetchingWithData<T> = {
  data: T
  type: 'fetching'
}

export type Error = {
  type: 'error'
  message: string
}

export type ErrorWithData<T> = {
  data: T
  type: 'error'
  message: string
}

export type HttpRequest<T = any> = NotAsked | Fetching | Success<T> | Error

export type LazyLoadedData<T> = NotAsked | FetchingWithData<T> | Success<T> | ErrorWithData<T>

export enum KeyCode {
  ArrowLeft = 37,
  ArrowRight = 39,
  Enter = 13,
  Space = 32,
}

export enum LocalStorageKey {
  SearchType = 'search_type',
}
