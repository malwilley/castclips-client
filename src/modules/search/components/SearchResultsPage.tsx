import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '~/redux/types';
import { SearchState, SearchType, SearchParams } from '../types';
import { thunks } from '../redux';
import HttpContent from '~/components/HttpContent';
import Header from '~/modules/header';
import SearchResultCard from './SearchResultCard';
import SearchTypeSwitch from './SearchTypeSwitch';
import { css } from 'emotion';
import { colors } from '~/styles';

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
  contentContainer: css({
    maxWidth: 800,
    margin: '0 auto',
    padding: '30px 10px 20px 10px',
  }),
  resultsHeader: css({
    '& > strong': {
      color: colors.dark,
    },
    color: colors.gray700,
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
      <div className={styles.contentContainer}>
        <SearchTypeSwitch className={styles.searchTypeSwitch} setSearch={setSearch} type={type} />
        <h2 className={styles.resultsHeader}>
          Search results for <strong>{query}</strong>
        </h2>
        <HttpContent
          request={results}
          renderSuccess={data => (
            <div>
              {data.map(result => (
                <SearchResultCard key={result.id} {...result} />
              ))}
            </div>
          )}
        />
      </div>
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
