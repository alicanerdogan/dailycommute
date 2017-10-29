import React, { PureComponent } from 'react';
import Pin from 'Assets/Pin';

export default class ArrivalList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getDepartures(this.getBaseStation().id);
  }

  getBaseStation() {
    const { home, work } = this.props;
    return new Date().getHours() < 12 ? home : work;
  }

  render() {
    const { departures } = this.props;
    if (!departures) return null;

    const baseStation = this.getBaseStation();

    return (
      <div className="arrival-list">
        <div className="station">
          <Pin />
          <h3>{baseStation.name}</h3>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Line</th>
              <th scope="col">Direction</th>
              <th scope="col">Arrival Time</th>
              <th scope="col">Delay</th>
            </tr>
          </thead>
          <tbody>
            {departures.map(({ line, when, direction, delay }) => {
              return (
                <tr>
                  <td>{line.name}</td>
                  <td>{direction}</td>
                  <td>{new Date(when).toString().substr(16, 5)}</td>
                  <td>{delay ? `${(delay / 60).toString()} min` : ''}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
