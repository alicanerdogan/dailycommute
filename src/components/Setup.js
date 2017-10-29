import React, { PureComponent } from 'react';
import Dropdown from './Dropdown';

export default class Setup extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0
    };
  }

  goNextStep(payload) {
    const { currentStep, home } = this.state;
    if (currentStep === 2) {
      this.props.storePreferences({ home, work: payload });
      return;
    }
    if (currentStep === 1) {
      this.props.clearSearchResults();
      this.setState(state => Object.assign({}, state, { currentStep: 2, home: payload }));
      return;
    }
    this.setState(state => Object.assign({}, state, { currentStep: state.currentStep + 1 }));
  }

  renderCurrentStep(stepIndex) {
    const { searchStations, stationResults } = this.props;
    switch (stepIndex) {
      case 0:
        return <Intro goNextStep={() => this.goNextStep()} />;
      case 1:
        return (
          <FirstStep
            goNextStep={home => this.goNextStep(home)}
            searchStations={searchStations}
            results={stationResults}
          />
        );
      case 2:
        return (
          <SecondStep
            goNextStep={work => this.goNextStep(work)}
            searchStations={searchStations}
            results={stationResults}
          />
        );
      default:
        return null;
    }
  }

  render() {
    return <div className="setup">{this.renderCurrentStep(this.state.currentStep)}</div>;
  }
}

const Intro = ({ goNextStep }) => (
  <div className="intro">
    <h2 className="no-margin">{'Select 2 stations that matter to you most.'}</h2>
    <h2>{'Start to get real time data now.'}</h2>
    <h2>{'For now only available in Berlin.'}</h2>
    <button onClick={goNextStep}>{'Begin'}</button>
  </div>
);

class FirstStep extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  goNextStep() {
    const selectedStation = this.refs.selector.getSelectedItem();
    if (!selectedStation) {
      return;
    }
    this.props.goNextStep(selectedStation);
  }

  render() {
    return (
      <div className="first-step">
        <h3>{'In which station your commute begin in the morning?'}</h3>
        <Dropdown
          ref="selector"
          mapItemToValue={s => s.id}
          mapItemToDisplayValue={s => s.name}
          items={this.props.results}
          refresh={input => this.props.searchStations(input)}
        />
        <button onClick={() => this.goNextStep()}>{'Next'}</button>
      </div>
    );
  }
}

class SecondStep extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  goNextStep() {
    const selectedStation = this.refs.selector.getSelectedItem();
    if (!selectedStation) {
      return;
    }
    this.props.goNextStep(selectedStation);
  }

  render() {
    return (
      <div className="first-step">
        <h3>{'In which station your commute begin in the afternoon?'}</h3>
        <Dropdown
          ref="selector"
          mapItemToValue={s => s.id}
          mapItemToDisplayValue={s => s.name}
          items={this.props.results}
          refresh={input => this.props.searchStations(input)}
        />
        <button onClick={() => this.goNextStep()}>{'Next'}</button>
      </div>
    );
  }
}
