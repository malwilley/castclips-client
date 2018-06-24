import * as React from 'react';
import { debounce, Cancelable } from 'lodash';
import {
  AutosuggestProps,
  InputProps,
  ChangeEvent,
  RenderSuggestion,
  RenderInputComponent,
  SuggestionsFetchRequested,
  OnSuggestionSelected
} from 'react-autosuggest';
const Autosuggest = require('react-autosuggest') as new () => React.Component<
  AutosuggestProps<types.PodcastSuggestion>,
  Object
>;
import PodcastSuggestion from './PodcastSuggestion';
import { searchPodcasts } from '~/api/gpodder';
import * as types from '~/types/index';
import './PodcastSearch.css';
import IconSearch from '~/icons/Search';
import IconSpinner from '~/icons/Spinner';
import { withRouter, RouteComponentProps } from 'react-router';

interface Props {
  searchDelay: number; // in ms
}

type WithRouterProps = RouteComponentProps<Props>;

interface State {
  query: string;
  suggestions: types.HttpRequest<types.PodcastSuggestion[]>;
  searchRequest?: SuggestionsFetchRequested & Cancelable;
}

class PodcastSearch extends React.Component<WithRouterProps, State> {
  constructor(props: WithRouterProps) {
    super(props);
    this.state = {
      query: '',
      suggestions: {
        type: 'not_asked'
      }
    };
  }

  updateSuggestions: SuggestionsFetchRequested = async ({ value }) => {
    this.setState({
      suggestions: {
        type: 'fetching'
      }
    });
    try {
      const response: types.GpodderPodcastResponse[] = await searchPodcasts(value);
      this.setState({
        suggestions: {
          type: 'success',
          data: response.map(r => {
            return {
              title: r.title,
              description: r.description,
              logoUrl: r.logo_url,
              podcastUrl: r.url
            };
          })
        }
      });
    } catch (err) {
      this.setState({
        suggestions: {
          type: 'error',
          message: err.message
        }
      });
    }
  };

  updateSuggestionsDebounced: SuggestionsFetchRequested = request => {
    if (this.state.searchRequest) {
      this.state.searchRequest.cancel();
    }
    const debounced = debounce(this.updateSuggestions, 500);
    this.setState({
      searchRequest: debounced
    });

    debounced(request);
  };

  clear = () => {
    if (this.state.searchRequest) {
      this.state.searchRequest.cancel();
    }
    this.setState({
      suggestions: {
        type: 'not_asked'
      },
      searchRequest: undefined
    });
  };

  onChange = (event: React.FormEvent<string>, { newValue }: ChangeEvent) => {
    this.setState({
      query: newValue
    });
  };

  getSuggestionValue = (suggestion: types.PodcastSuggestion) => {
    return suggestion.title;
  };

  onSuggestionSelected: OnSuggestionSelected<types.PodcastSuggestion> = (event, { suggestion }) => {
    this.props.history.push(`/podcast?feed=${suggestion.podcastUrl}`);
  };

  getIcon = () => {
    switch (this.state.suggestions.type) {
      case 'fetching':
        return <IconSpinner className="search-icon" />;
      case 'error':
        return <IconSearch className="search-icon" />;
      default:
        return <IconSearch className="search-icon" />;
    }
  };

  render() {
    const renderInput: RenderInputComponent<types.PodcastSuggestion> = props => (
      <div className="search-container">
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
      value: this.state.query
    };

    const suggestions =
      this.state.suggestions.type === 'success' ? this.state.suggestions.data : [];

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.updateSuggestionsDebounced}
        onSuggestionsClearRequested={this.clear}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={renderSuggestion}
        renderInputComponent={renderInput}
        inputProps={inputProps}
        onSuggestionSelected={this.onSuggestionSelected}
      />
    );
  }
}

const RouterComponent = withRouter<WithRouterProps>(PodcastSearch);

export default (props: Props) => <RouterComponent {...props} />;
