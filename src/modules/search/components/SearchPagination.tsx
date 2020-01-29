import React from 'react'
import { css } from 'emotion'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router'
import { parse, stringify } from 'querystringify'
import { primaryButtonStyles } from 'components/PrimaryButton'

type SearchPaginationProps = {
  page: number
  total: number
}

const styles = {
  main: css({
    '& > :not(:last-child)': {
      marginRight: '1em',
    },
    display: 'flex',
    justifyContent: 'flex-end',
  }),
}

const SearchPagination: React.FC<SearchPaginationProps> = ({ page, total }) => {
  const numPages = Math.ceil(total / 10)
  const { pathname, search } = useLocation()
  const params = parse(search)

  return (
    <div className={styles.main}>
      {page > 1 && (
        <Link
          className={primaryButtonStyles}
          to={`${pathname}?${stringify({ ...params, page: page - 1 })}`}
        >
          Previous
        </Link>
      )}
      {page < numPages && (
        <Link
          className={primaryButtonStyles}
          to={`${pathname}?${stringify({ ...params, page: page + 1 })}`}
        >
          Next
        </Link>
      )}
    </div>
  )
}

export default SearchPagination
