import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from 'src/redux/types';
import { SearchState, SearchType, SearchParams } from '../types';
import { thunks } from '../redux';
import HttpContent from 'src/components/HttpContent';
import Header from 'src/modules/header';
import SearchResultCard, { SearchResultCardFetching } from './SearchResultCard';
import SearchTypeSwitch from './SearchTypeSwitch';
import { css } from 'emotion';
import { colors } from 'src/styles';
import LayoutContainer from 'src/components/LayoutContainer';

type SearchResultsPageProps = {
  query: string;
  type?: SearchState['type'];
};

type SearchResultsPageConnectedProps = SearchResultsPageProps & {
  fetchSearchResults: (params: SearchParams) => void;
  results: SearchState['results'];
  setSearch: (params: SearchParams) => void;
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
  fetchSearchResults,
  query,
  results,
  setSearch,
  type,
}) => {
  React.useEffect(() => {
    fetchSearchResults({ query, type });
  }, [fetchSearchResults, type]);

  return (
    <div>
      <Header />
      <LayoutContainer className={styles.container}>
        <SearchTypeSwitch className={styles.searchTypeSwitch} setSearch={setSearch} type={type} />
        <h2 className={styles.resultsHeader}>
          Search results for <strong>{query}</strong>
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

const mapDispatchToProps = {
  fetchSearchResults: thunks.fetchSearchResults,
  setSearch: thunks.setSearch,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResultsPage);
