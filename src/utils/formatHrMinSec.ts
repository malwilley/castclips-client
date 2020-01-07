import { dropWhile, head, tail } from 'ramda'

const formatNumber = (num: number) => (num < 10 ? `0${num}` : num)

const formatHrMinSec = (seconds: number, shorten = false): string => {
  const hrMinSec = [
    Math.max(Math.floor(seconds / 3600), 0),
    Math.max(Math.floor((seconds % 3600) / 60), 0),
    Math.max(Math.floor((seconds % 3600) % 60), 0),
  ]

  if (!shorten) {
    return hrMinSec.map(formatNumber).join(':')
  }

  const trimStart = dropWhile(value => value === 0, hrMinSec)
  if (trimStart.length === 0) {
    return '0:00'
  }
  if (trimStart.length === 1) {
    return `0:${formatNumber(head(trimStart)!)}`
  }
  return `${head(trimStart)}:${tail(trimStart)
    .map(formatNumber)
    .join(':')}`
}

export default formatHrMinSec
