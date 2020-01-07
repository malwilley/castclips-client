import { pipe, split, reverse, take, map, addIndex, reduce } from 'ramda'

const parseHrMinSec = pipe<string, string[], string[], string[], number[], number>(
  split(':'),
  reverse,
  take(3),
  map((str: string) => Number(str) || 0),
  addIndex<number, number>(reduce)(
    (seconds, next, index) => seconds + next * Math.pow(60, index),
    0
  )
)

export default parseHrMinSec
