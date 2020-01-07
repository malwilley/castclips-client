import React from 'react'
import useChangeQueryParam from 'hooks/useChangeQueryParam'
import { push } from 'connected-react-router'
import { css } from 'emotion'
import PrimaryButton from 'components/PrimaryButton'
import SecondaryButton from 'components/SecondaryButton'

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
  const changeQueryParam = useChangeQueryParam(push)

  return (
    <div className={styles.main}>
      <SecondaryButton active={page > 1} onClick={() => changeQueryParam('page', page - 1)}>
        Previous
      </SecondaryButton>
      <PrimaryButton active={page < numPages} onClick={() => changeQueryParam('page', page + 1)}>
        Next
      </PrimaryButton>
    </div>
  )
}

export default SearchPagination
