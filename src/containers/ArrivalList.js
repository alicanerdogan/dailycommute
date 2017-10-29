import { connect } from 'react-redux';

import ArrivalList from 'Components/ArrivalList';
import { getDepartures } from 'Actions/api';
import { clearSearchResults } from 'Actions/ui';

const mapStateToProps = state => state.reducer;

export default connect(mapStateToProps, { getDepartures, clearSearchResults })(ArrivalList);
