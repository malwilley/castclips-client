import { css } from 'emotion';
import { Cancelable, debounce } from 'lodash';
import * as React from 'react';
import {
  AutosuggestProps,
  ChangeEvent,
  InputProps,
  OnSuggestionSelected,
  RenderInputComponent,
  RenderSuggestion,
  SuggestionsFetchRequested,
} from 'react-autosuggest';
const Autosuggest = require('react-autosuggest') as new () => React.Component<
  AutosuggestProps<types.PodcastSuggestion>,
  Object
>;
import { Route } from 'react-router';
import { typeahead } from '~/api/listenNotes';
import IconSearch from '~/icons/Search';
import IconSpinner from '~/icons/Spinner';
import * as types from '~/types';
import './PodcastSearch.css';
import PodcastSuggestion from '~/modules/Search/PodcastSuggestion';
import { History } from 'history';

type PodcastSearchProps = {
  searchDelay: number; // in ms
};

type PodcastSearchState = {
  query: string;
  suggestions: types.HttpRequest<types.PodcastSuggestion[]>;
  searchRequest?: SuggestionsFetchRequested & Cancelable;
};

const styles = {
  searchContainer: css({
    position: 'relative',
    width: '100%',
    maxWidth: '380px',
    height: 52,
  }),
  searchIcon: css({
    position: 'absolute',
    right: 16,
    top: 14,
    width: 24,
    height: 24,
    fill: 'var(--color-dark)',
  }),
};

class PodcastSearch extends React.Component<PodcastSearchProps, PodcastSearchState> {
  constructor(props: PodcastSearchProps) {
    super(props);
    this.state = {
      query: '',
      suggestions: {
        type: 'not_asked',
      },
    };
  }

  updateSuggestions: SuggestionsFetchRequested = async ({ value }) => {
    this.setState({
      suggestions: {
        type: 'fetching',
      },
    });
    try {
      const response = await typeahead(value);
      this.setState({
        suggestions: {
          type: 'success',
          data: response.podcasts.map(r => {
            return {
              id: r.id,
              title: r.title_original,
              logoUrl: r.thumbnail,
              podcastUrl: r.id,
            };
          }),
        },
      });
    } catch (err) {
      this.setState({
        suggestions: {
          type: 'error',
          message: err.message,
        },
      });
    }
  };

  updateSuggestionsDebounced: SuggestionsFetchRequested = request => {
    if (this.state.searchRequest) {
      this.state.searchRequest.cancel();
    }
    const debounced = debounce(this.updateSuggestions, 500);
    this.setState({
      searchRequest: debounced,
    });

    debounced(request);
  };

  clear = () => {
    if (this.state.searchRequest) {
      this.state.searchRequest.cancel();
    }
    this.setState({
      suggestions: {
        type: 'not_asked',
      },
      searchRequest: undefined,
    });
  };

  onChange = (event: React.FormEvent<string>, { newValue }: ChangeEvent) => {
    this.setState({
      query: newValue,
    });
  };

  getSuggestionValue = (suggestion: types.PodcastSuggestion) => {
    return suggestion.title;
  };

  makeOnSuggestionSelected = (history: History): OnSuggestionSelected<types.PodcastSuggestion> => (
    _,
    { suggestion }
  ) => {
    history.push(`/podcast/${suggestion.id}`);
  };

  getIcon = () => {
    switch (this.state.suggestions.type) {
      case 'fetching':
        return <IconSpinner className={styles.searchIcon} />;
      case 'error':
        return <IconSpinner className={styles.searchIcon} />;
      default:
        return <IconSearch className={styles.searchIcon} />;
    }
  };

  render() {
    // @ts-ignore
    const renderInput: RenderInputComponent<types.PodcastSuggestion> = props => (
      <div className={styles.searchContainer}>
        {/*
        // @ts-ignore */}
        <input {...props} />
        {this.getIcon()}
      </div>
    );

    const renderSuggestion: RenderSuggestion<types.PodcastSuggestion> = suggestion => {
      return <PodcastSuggestion suggestion={suggestion} />;
    };

    const inputProps: InputProps<types.PodcastSuggestion> = {
      placeholder: 'Find a podcast',
      onChange: this.onChange,
      value: this.state.query,
    };

    const suggestions =
      this.state.suggestions.type === 'success' ? this.state.suggestions.data : [];

    return (
      <Route
        render={({ history }) => (
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.updateSuggestionsDebounced}
            onSuggestionsClearRequested={this.clear}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={renderSuggestion}
            renderInputComponent={renderInput}
            inputProps={inputProps}
            onSuggestionSelected={this.makeOnSuggestionSelected(history)}
          />
        )}
      />
    );
  }
}

export default PodcastSearch;
