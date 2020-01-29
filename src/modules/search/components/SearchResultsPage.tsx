import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from 'redux/types'
import { SearchType } from '../types'
import HttpContent from 'components/HttpContent'
import SearchResultCard, { SearchResultCardFetching } from './SearchResultCard'
import SearchTypeSwitch from './SearchTypeSwitch'
import { css } from 'emotion'
import { colors, fonts } from 'styles'
import LayoutContainer from 'components/LayoutContainer'
import { LocalStorageKey } from 'types'
import useLocalStorage from 'hooks/useLocalStorage'
import { replace } from 'connected-react-router'
import SearchPagination from './SearchPagination'
import { actions } from '../redux/actions'
import useTitle from 'hooks/useTitle'
import capitalizeFirstLetter from 'utils/capitalizeFirstLetter'
import { useLocation } from 'react-router'
import { parse, stringify } from 'querystringify'

type SearchResultsPageProps = {
  query: string
  type?: SearchType
  page?: number
}

const styles = {
  container: css({
    marginTop: 40,
  }),
  resultsHeader: css(fonts.text300, {
    '& > strong': {
      color: colors.gray600,
    },
    height: '1.1em',
    color: colors.gray200,
    marginBottom: '1em',
  }),
  searchTypeSwitch: css({
    marginBottom: 30,
  }),
  separator: css({
    width: '100%',
    height: 1,
    backgroundColor: colors.gray50,
  }),
}

const SearchResultsPage: React.FC<SearchResultsPageProps> = ({ query, page = 1 }) => {
  const dispatch = useDispatch()
  const { pathname, search } = useLocation()
  const params: { type?: SearchType } = parse(search)
  const typeFromUrl = params.type

  const [storedType, setStoredType] = useLocalStorage<SearchType>(
    LocalStorageKey.SearchType,
    SearchType.Podcasts
  )

  const type = typeFromUrl || storedType
  const results = useSelector((state: AppState) => state.search[type])

  useEffect(() => {
    if (!typeFromUrl) {
      dispatch(replace(`${pathname}?${stringify({ ...params, type })}`))
    }
    if (type !== storedType) {
      setStoredType(type)
    }
  }, [dispatch, params, pathname, setStoredType, storedType, type, typeFromUrl])

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(actions.executeSearch({ query, type, page }))
  }, [query, type, page, dispatch])

  useTitle(`${query} - ${capitalizeFirstLetter(type)}s`)

  return (
    <>
      <div className={styles.separator} />
      <LayoutContainer className={styles.container}>
        <SearchTypeSwitch className={styles.searchTypeSwitch} type={type} />
        <h2 className={styles.resultsHeader}>
          <HttpContent
            request={results as any}
            renderSuccess={({ total }) => (
              <>
                {(total || 0).toLocaleString()} {type}s matching <strong>{query}</strong>
              </>
            )}
          />
        </h2>
        <HttpContent
          request={results as any}
          renderFetching={() => (
            <>
              {Array(10)
                .fill(0)
                .map((_, index) => (
                  <SearchResultCardFetching key={index} />
                ))}
            </>
          )}
          renderSuccess={data => {
            return (
              <>
                {data.results.map((result: any) => (
                  <SearchResultCard
                    key={result.id}
                    {...result}
                    thumbnail={result.thumbnail || result.podcast.thumbnail}
                  />
                ))}
                <SearchPagination {...{ page, total: data.total }} />
              </>
            )
          }}
        />
      </LayoutContainer>
    </>
  )
}

export default SearchResultsPage
