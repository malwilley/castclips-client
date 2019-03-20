import { HttpRequest } from '~/types';

export type SearchState = {
  suggestions: HttpRequest<string[]>;
};
