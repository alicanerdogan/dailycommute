import { GET_DEPARTURES, SEARCH_STATIONS, STORE_PREFERENCES, CLEAR_SEARCH_RESULTS } from 'Actions';

function loadPreferences() {
  try {
    const home = localStorage.getItem('HOME');
    const work = localStorage.getItem('WORK');
    if (!home || !work) {
      return undefined;
    }
    return {
      home: JSON.parse(home),
      work: JSON.parse(work)
    };
  } catch (err) {
    return undefined;
  }
}

const { home, work } = loadPreferences() || {};
const isArrivalListVisible = home && work;
const DEFAULT_STATE = { departures: null, stationResults: null, isArrivalListVisible, home, work };

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case GET_DEPARTURES.success:
      return Object.assign({}, state, { departures: action.payload });
    case SEARCH_STATIONS.success:
      return Object.assign({}, state, { stationResults: action.payload });
    case CLEAR_SEARCH_RESULTS:
      return Object.assign({}, state, { stationResults: [] });
    case STORE_PREFERENCES:
      return Object.assign({}, state, { isArrivalListVisible: true }, action.payload);
    default:
      return state;
  }
};
