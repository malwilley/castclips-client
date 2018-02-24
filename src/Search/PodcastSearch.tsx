import * as React from 'react';
import { debounce, Cancelable } from 'lodash';
import { 
  AutosuggestProps, 
  InputProps, 
  ChangeEvent, 
  RenderSuggestion, 
  SuggestionsFetchRequested,
  OnSuggestionSelected } from 'react-autosuggest';
const Autosuggest = require('react-autosuggest') as new() => 
  React.Component<AutosuggestProps<types.PodcastSuggestion>, Object>;
import PodcastSuggestion from './PodcastSuggestion';
import { searchPodcasts } from '../api/gpodder';
import * as types from '../types/index';

interface Props {
  searchDelay: number; // in ms
}

interface State {
  query: string;
  suggestions: types.HttpRequest<types.PodcastSuggestion[]>;
  searchRequest?: SuggestionsFetchRequested & Cancelable;
}

class PodcastSearch extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      query: '',
      suggestions: {
        type: 'not_asked'
      }
    };
  }

  updateSuggestions: SuggestionsFetchRequested = async ({value}) => {
    const response: types.GpodderPodcastResponse[] = await searchPodcasts(value);
    this.setState({
      suggestions: {
        type: 'success',
        data: response.map(r => {
          return {
            title: r.title,
            description: r.description,
            logoUrl: r.logo_url,
            podcastUrl: ''
          };
        })
      }
    });
  }

  updateSuggestionsDebounced: SuggestionsFetchRequested = (request) => {
    if (this.state.searchRequest) {
      this.state.searchRequest.cancel();
    }
    const debounced = debounce(this.updateSuggestions, 500);
    this.setState({
      searchRequest: debounced
    });

    debounced(request);
  }

  clear = () => {
    /*
    if (this.state.searchRequest) {
      this.state.searchRequest.cancel();
    }
    this.setState({
      query: '',
      suggestions: {
        type: 'not_asked'
      },
      searchRequest: undefined
    });
    */
  }

  onChange = (event: React.FormEvent<string>, { newValue }: ChangeEvent) => {
    this.setState({
      query: newValue
    });
  }

  getSuggestionValue = (suggestion: types.PodcastSuggestion) => {
    return suggestion.title;
  }

  onSuggestionSelected: OnSuggestionSelected<types.PodcastSuggestion> = (event, {suggestion}) => {
    console.log('go to podcast page for ' + suggestion.title);
  }

  render() {

    const renderSuggestion: RenderSuggestion<types.PodcastSuggestion> = suggestion => {
      return <PodcastSuggestion suggestion={suggestion} />;
    };

    const inputProps: InputProps<types.PodcastSuggestion> = {
      placeholder: 'Find a podcast',
      onChange: this.onChange,
      value: this.state.query
    };

    const suggestions = this.state.suggestions.type === 'success' 
      ? this.state.suggestions.data 
      : [];

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.updateSuggestionsDebounced}
        onSuggestionsClearRequested={this.clear}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        onSuggestionSelected={this.onSuggestionSelected}
      />
    );
  }
}

export default PodcastSearch;
