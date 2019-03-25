import * as debounce from 'debounce';
import * as qs from 'querystringify';
import * as React from 'react';
import { SearchState } from '../types';
import { connect } from 'react-redux';
import { AppState } from '~/redux/types';
import { thunks } from '../redux';
import Downshift from 'downshift';
import { css } from 'emotion';
import { SearchIcon } from 'mdi-react';
import { colors } from '~/styles';

type TypeaheadProps = {
  className?: string;
};

type TypeaheadConnectedProps = TypeaheadProps & {
  clearSuggestions: () => void;
  executeSearch: (query: string) => void;
  fetchSuggestions: (query: string) => void;
  query?: string;
  suggestions: SearchState['suggestions'];
};

const styles = {
  main: css({
    position: 'relative',
    width: 400,
    height: 60,
  }),
  searchContainer: css({
    position: 'relative',
    background: colors.lightest,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    zIndex: 100,
    width: '100%',
    height: '100%',
  }),
  searchContainerOpen: css({
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  }),
  searchIcon: css({
    position: 'absolute',
    right: 20,
    top: 18,
    fill: 'var(--color-dark)',
  }),
  suggestion: css({
    '&:hover': {
      backgroundColor: colors.gray100,
    },
    padding: '6px 24px',
    cursor: 'pointer',
  }),
  suggestionContainer: css({
    position: 'absolute',
    top: 60,
    width: '100%',
    overflow: 'hidden',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    background: colors.lightest,
    color: colors.dark,
    padding: '10px 0',
    boxShadow: 'var(--card-dropshadow-feature)',
  }),
  input: css({
    '&::placeholder': {
      color: colors.gray700,
    },
    border: 'none',
    background: 'none',
    width: '100%',
    height: '100%',
    padding: '0 40px 0 24px',
    fontFamily: 'var(--p-font)',
    color: colors.dark,
    fontSize: 16,
  }),
};

const shouldBeOpen = (isOpen: boolean, suggestions: TypeaheadConnectedProps['suggestions']) =>
  isOpen && suggestions.type === 'success' && suggestions.data.length > 0;

const Typeahead: React.FC<TypeaheadConnectedProps> = ({
  className,
  clearSuggestions,
  executeSearch,
  fetchSuggestions,
  query,
  suggestions,
}) => {
  React.useEffect(() => {
    clearSuggestions();
  }, [clearSuggestions]);

  const debouncedFetch = React.useCallback(debounce(fetchSuggestions, 300), [fetchSuggestions]);
  console.log(query);
  return (
    <Downshift
      initialInputValue={query}
      onChange={suggestion => executeSearch(suggestion)}
      onInputValueChange={debouncedFetch}
    >
      {({ getInputProps, getItemProps, getMenuProps, isOpen }) => (
        <div className={css(styles.main, className)}>
          <div
            className={css(
              styles.searchContainer,
              shouldBeOpen(isOpen, suggestions) && styles.searchContainerOpen
            )}
          >
            <input
              {...getInputProps({
                className: styles.input,
                placeholder: 'Search for podcasts, episodes, and clips',
              })}
            />
            <SearchIcon className={styles.searchIcon} size={24} />
          </div>
          {shouldBeOpen(isOpen, suggestions) && suggestions.type === 'success' && (
            <ul
              {...getMenuProps({
                className: styles.suggestionContainer,
              })}
            >
              {suggestions.data.map((suggestion, index) => (
                <li
                  {...getItemProps({
                    className: styles.suggestion,
                    key: suggestion,
                    index,
                    item: suggestion,
                  })}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </Downshift>
  );
};

const mapPropsToState = (state: AppState) => ({
  suggestions: state.search.suggestions,
  query: (qs.parse(state.router.location.search) as { q: string }).q,
});

const mapDispatchToProps = {
  clearSuggestions: thunks.clearSuggestions,
  executeSearch: thunks.executeSearch,
  fetchSuggestions: thunks.fetchSuggestions,
};

export default connect(
  mapPropsToState,
  mapDispatchToProps
)(Typeahead);
