import { createAction } from 'Util/helper';
import { STORE_PREFERENCES, CLEAR_SEARCH_RESULTS } from './';

export function storePreferences(preferences) {
  return createAction(STORE_PREFERENCES, preferences);
}

export function clearSearchResults() {
  return createAction(CLEAR_SEARCH_RESULTS);
}
