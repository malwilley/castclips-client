import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { AppState } from 'src/redux/types';
import { SearchState, SearchParams, SearchType } from '../types';
import { thunks } from '../redux';
import HttpContent from 'src/components/HttpContent';
import Header from 'src/modules/header';
import SearchResultCard, { SearchResultCardFetching } from './SearchResultCard';
import SearchTypeSwitch from './SearchTypeSwitch';
import { css } from 'emotion';
import { colors } from 'src/styles';
import LayoutContainer from 'src/components/LayoutContainer';
import { LocalStorageKey } from 'src/types';
import useLocalStorage from 'src/hooks/useLocalStorage';
import { replace } from 'connected-react-router';
import useChangeQueryParam from 'src/hooks/useChangeQueryParam';

type SearchResultsPageProps = {
  query: string;
  type?: SearchState['type'];
};

type SearchResultsPageConnectedProps = SearchResultsPageProps & {
  results: SearchState['results'];
};

const styles = {
  container: css({
    marginTop: 40,
  }),
  resultsHeader: css({
    '& > strong': {
      color: colors.gray600,
    },
    color: colors.gray200,
    marginBottom: 20,
    fontWeight: 'normal',
  }),
  searchTypeSwitch: css({
    marginBottom: 30,
  }),
};

const SearchResultsPage: React.FC<SearchResultsPageConnectedProps> = ({
  query,
  results,
  type: typeFromUrl,
}) => {
  const dispatch = useDispatch();
  const changeQueryParam = useChangeQueryParam(replace);
  const [storedType, setStoredType] = useLocalStorage(
    LocalStorageKey.SearchType,
    SearchType.Podcasts
  );

  const type = typeFromUrl || storedType;

  React.useEffect(() => {
    if (!typeFromUrl) {
      changeQueryParam('type', type);
    }
    if (type !== storedType) {
      setStoredType(type);
    }
  }, [type]);

  React.useEffect(() => {
    dispatch(thunks.fetchSearchResults({ query, type }));
  }, [query, type]);

  return (
    <div>
      <Header searchText={query} />
      <LayoutContainer className={styles.container}>
        <SearchTypeSwitch className={styles.searchTypeSwitch} type={type} />
        <h2 className={styles.resultsHeader}>
          {type}s matching <strong>{query}</strong>
        </h2>
        <HttpContent
          request={results}
          renderFetching={() => (
            <>
              {Array(10)
                .fill(0)
                .map((_, index) => (
                  <SearchResultCardFetching key={index} />
                ))}
            </>
          )}
          renderSuccess={data => (
            <div>
              {data.map(result => (
                <SearchResultCard key={result.id} {...result} />
              ))}
            </div>
          )}
        />
      </LayoutContainer>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  results: state.search.results,
});

export default connect(mapStateToProps)(SearchResultsPage);
