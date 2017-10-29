import { connect } from 'react-redux';

import Setup from 'Components/Setup';
import { searchStations } from 'Actions/api';
import { storePreferences, clearSearchResults } from 'Actions/ui';

const mapStateToProps = state => state.reducer;

export default connect(mapStateToProps, { searchStations, storePreferences, clearSearchResults })(Setup);
