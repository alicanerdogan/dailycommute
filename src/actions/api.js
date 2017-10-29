import { createRESTAction } from 'Util/rest';
import { GET_DEPARTURES, SEARCH_STATIONS } from './';

const BASE_URL = 'https://vbb.transport.rest/';
const STATIONS_URL = `${BASE_URL}stations`;

export function getDepartures(stationId) {
  return createRESTAction(GET_DEPARTURES, `${STATIONS_URL}/${stationId}/departures?results=10`, { mode: 'no-cors' });
}

export function searchStations(query) {
  return createRESTAction(SEARCH_STATIONS, `${STATIONS_URL}?query=${query}&fuzzy=true`, { mode: 'no-cors' });
}
