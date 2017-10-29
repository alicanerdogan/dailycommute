import React, { Component } from 'react';
import { connect } from 'react-redux';
import ArrivalList from 'Containers/ArrivalList';
import Header from 'Components/Header';
import Setup from 'Containers/Setup';

class App extends Component {
  render() {
    return (
      <div className="app-root">
        <div className="container">
          <Header />
          {this.props.isArrivalListVisible ? <ArrivalList /> : <Setup />}
        </div>
      </div>
    );
  }
}

export default connect(state => state.reducer, {})(App);
