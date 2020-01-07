import isThisWeek from 'date-fns/is_this_week'
import isToday from 'date-fns/is_today'
import isThisYear from 'date-fns/is_this_year'
import format from 'date-fns/format'

const formatPublishDate = (date: Date) => {
  if (isToday(date)) {
    return 'today'
  }
  if (isThisWeek(date)) {
    return format(date, 'dddd')
  }
  if (isThisYear(date)) {
    return format(date, 'MMM D')
  }
  return format(date, 'MMM D YYYY')
}

export default formatPublishDate
