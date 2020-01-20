const Maybe = {
  map: <T, U>(transform: (d: T) => U) => (data: Maybe<T>) => {
    return data ? transform(data) : data
  },
}

export default Maybe
