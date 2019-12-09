import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'src/redux/types';
import { SearchType } from '../types';
import HttpContent from 'src/components/HttpContent';
import SearchResultCard, { SearchResultCardFetching } from './SearchResultCard';
import SearchTypeSwitch from './SearchTypeSwitch';
import { css } from 'emotion';
import { colors, fonts } from 'src/styles';
import LayoutContainer from 'src/components/LayoutContainer';
import { LocalStorageKey } from 'src/types';
import useLocalStorage from 'src/hooks/useLocalStorage';
import { replace } from 'connected-react-router';
import useChangeQueryParam from 'src/hooks/useChangeQueryParam';
import { actions } from '../redux/actions';
import { search } from 'src/api/firebase';
import { getAuthToken } from 'src/modules/auth/firebase';
import makeMapSearchResult from '../utils/mapSearchResult';
import SearchPagination from './SearchPagination';

type SearchResultsPageProps = {
  query: string;
  type?: SearchType;
  page?: number;
};

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
};

const fetchSearchResults = async ({
  dispatch,
  query,
  type,
  page,
}: {
  dispatch: (_: any) => void;
  query: string;
  type: SearchType;
  page: number;
}) => {
  if (!query) {
    return;
  }

  dispatch(actions.setSearchRequest({ request: { type: 'fetching' }, type }));

  try {
    const token = await getAuthToken();
    const offset = (page - 1) * 10;
    const { results, total } = await search(token, { type, query, offset });
    dispatch(
      actions.setSearchRequest({
        type,
        request: {
          type: 'success',
          data: {
            total,
            results: results.map(makeMapSearchResult(type)),
          },
        },
      })
    );
  } catch {
    dispatch(
      actions.setSearchRequest({
        request: { type: 'error', message: 'Error fetching search results' },
        type,
      })
    );
  }
};

const SearchResultsPage: React.FC<SearchResultsPageProps> = ({
  query,
  type: typeFromUrl,
  page = 1,
}) => {
  const dispatch = useDispatch();
  const changeQueryParam = useChangeQueryParam(replace);
  const [storedType, setStoredType] = useLocalStorage<SearchType>(
    LocalStorageKey.SearchType,
    SearchType.Podcasts
  );

  const type = typeFromUrl || storedType;
  const results = useSelector((state: AppState) => state.search[type]);

  React.useEffect(() => {
    if (!typeFromUrl) {
      changeQueryParam('type', type);
    }
    if (type !== storedType) {
      setStoredType(type);
    }
  }, [changeQueryParam, setStoredType, storedType, type, typeFromUrl]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    fetchSearchResults({ dispatch, query, type, page });
  }, [query, type, page, dispatch]);

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
            );
          }}
        />
      </LayoutContainer>
    </>
  );
};

export default SearchResultsPage;
