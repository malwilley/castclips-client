import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '~/redux/types';
import { SearchState } from '../types';
import { thunks } from '../redux';
import HttpContent from '~/components/HttpContent';
import Header from '~/modules/header';
import SearchResultCard from './SearchResultCard';

type SearchResultsPageProps = {
  query: string;
};

type SearchResultsPageConnectedProps = SearchResultsPageProps & {
  fetchSearchResults: (query: string) => void;
  results: SearchState['results'];
  searchType: SearchState['type'];
};

const SearchResultsPage: React.FC<SearchResultsPageConnectedProps> = ({
  fetchSearchResults,
  query,
  results,
  searchType,
}) => {
  React.useEffect(() => {
    fetchSearchResults(query);
  }, [fetchSearchResults]);

  return (
    <div>
      <Header />
      <HttpContent
        request={results}
        renderSuccess={data => (
          <div>
            {data.map(({ title, description, thumbnail }) => (
              <SearchResultCard {...{ title, description, thumbnail }} />
            ))}
          </div>
        )}
      />
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  results: state.search.results,
  searchType: state.search.type,
});

const mapDispatchToProps = {
  fetchSearchResults: thunks.fetchSearchResults,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResultsPage);
