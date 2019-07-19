import * as qs from 'querystringify';
import * as React from 'react';
import debounce from 'debounce';
import { SearchState, SearchType } from '../types';
import { connect } from 'react-redux';
import { AppState } from 'src/redux/types';
import { thunks } from '../redux';
import Downshift from 'downshift';
import { css } from 'emotion';
import SearchIcon from 'mdi-react/SearchIcon';
import { colors } from 'src/styles';
import { push } from 'connected-react-router';

type TypeaheadProps = {
  className?: string;
  searchContainerClassName?: string;
  suggestionContainerClassName?: string;
};

type TypeaheadConnectedProps = TypeaheadProps & {
  clearSuggestions: () => void;
  executeSearch: (query: string) => void;
  fetchSuggestions: (query: string) => void;
  goto: (path: string) => void;
  query?: string;
  suggestions: SearchState['suggestions'];
};

const styles = {
  main: css({
    position: 'relative',
    height: 60,
  }),
  searchContainer: css({
    '& > svg': {
      position: 'absolute',
      right: 20,
      top: 18,
      fill: 'var(--color-dark)',
    },
    '& > input': {
      '&::placeholder': {
        color: colors.gray200,
      },
      border: 'none',
      background: 'none',
      width: '100%',
      height: '100%',
      padding: '0 40px 0 24px',
      fontFamily: 'var(--p-font)',
      color: colors.gray600,
      fontSize: 16,
    },
    position: 'relative',
    background: colors.white,
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
      backgroundColor: colors.gray20,
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
    background: colors.white,
    color: colors.gray600,
    padding: '10px 0',
    boxShadow: 'var(--card-dropshadow-feature)',
  }),
};

const shouldBeOpen = (isOpen: boolean, suggestions: TypeaheadConnectedProps['suggestions']) =>
  isOpen && suggestions.type === 'success' && suggestions.data.length > 0;

const Typeahead: React.FC<TypeaheadConnectedProps> = ({
  className,
  clearSuggestions,
  executeSearch,
  fetchSuggestions,
  goto,
  query,
  searchContainerClassName,
  suggestionContainerClassName,
  suggestions,
}) => {
  React.useEffect(() => {
    clearSuggestions();
  }, [clearSuggestions]);

  const debouncedFetch = React.useCallback(debounce(fetchSuggestions, 300), [fetchSuggestions]);

  return (
    <Downshift
      initialInputValue={query}
      onChange={suggestion => executeSearch(suggestion)}
      onInputValueChange={debouncedFetch}
    >
      {({ getInputProps, getItemProps, getMenuProps, isOpen, inputValue }) => (
        <div className={css(styles.main, className)}>
          <div
            className={css(
              styles.searchContainer,
              searchContainerClassName,
              shouldBeOpen(isOpen, suggestions) && styles.searchContainerOpen
            )}
          >
            <input
              {...getInputProps({
                onKeyDown: (event: any) => {
                  if (event.key === 'Enter') {
                    goto(`/search?${qs.stringify({ q: inputValue, type: SearchType.Podcasts })}`);
                  }
                },
                placeholder: 'Search for podcasts, episodes, and clips',
              })}
            />
            <SearchIcon size={24} />
          </div>
          {shouldBeOpen(isOpen, suggestions) && suggestions.type === 'success' && (
            <ul
              {...getMenuProps({
                className: css(styles.suggestionContainer, suggestionContainerClassName),
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
  goto: push,
};

export default connect(
  mapPropsToState,
  mapDispatchToProps
)(Typeahead);
