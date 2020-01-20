import { HttpRequest } from 'types'

const HttpUnion = {
  map: <T, U>(transform: (data: T) => U) => (union: HttpRequest<T>) => {
    return union.type === 'success' ? transform(union.data) : null
  },
  unwrap: <T>(union: HttpRequest<T>) => {
    return union.type === 'success' ? union.data : null
  },
}

export default HttpUnion
