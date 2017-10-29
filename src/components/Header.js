import React, { PureComponent } from 'react';
import Train from 'Assets/Train';

export default class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="header">
        <Train />
        <h1>{'Daily Commute'}</h1>
      </div>
    );
  }
}
