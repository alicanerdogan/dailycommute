import React, { Component } from 'react';
import { debounce } from 'Util/helper';

const keycodes = {
  ENTER: 13,
  ARROW_LEFT: 37,
  ARROW_UP: 38,
  ARROW_RIGHT: 39,
  ARROW_DOWN: 40,
  BACKSPACE: 8
};

export default class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.refresh = this.props.refresh && debounce(this.props.refresh, 400);

    this.state = {
      focused: false,
      selectedItemIndex: undefined
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.items !== nextProps.items) {
      this.setState({
        focused: this.state.focused,
        selectedItemIndex: nextProps.items.length > 0 && this.state.focused ? 0 : undefined
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.props.onChange) {
      return;
    }

    const previousSelectedItem = prevProps.items && prevProps.items[prevState.selectedItemIndex];
    const selectedItem = this.getSelectedItem();

    if (this.getValueOfItem(previousSelectedItem) !== this.getValueOfItem(selectedItem)) {
      this.props.onChange(selectedItem);
    }
  }

  componentDidMount() {
    this.refresh && this.refresh();
  }

  onInputChange() {
    this.refresh && this.refresh(this.refs.input.value);
  }

  onKeyDown(event) {
    const { focused, selectedItemIndex } = this.state;
    switch (event.keyCode) {
      case keycodes.ARROW_DOWN:
        if (this.props.items.length - 1 <= this.state.selectedItemIndex) break;
        this.setState({
          focused,
          selectedItemIndex: selectedItemIndex + 1
        });
        break;
      case keycodes.ARROW_UP:
        if (!this.state.selectedItemIndex) break;
        this.setState({
          focused,
          selectedItemIndex: selectedItemIndex - 1
        });
        break;
      case keycodes.ENTER:
        document.activeElement.blur();
        break;
      default:
        break;
    }
  }

  onBlur() {
    const selectedItem = this.getSelectedItem();
    if (!selectedItem) {
      return;
    }
    this.value = this.getValueOfItem(selectedItem);
    this.refs.input.value = this.getDisplayedValueOfItem(selectedItem);
    this.setState({
      focused: false,
      selectedItemIndex: this.state.selectedItemIndex
    });
  }

  onItemClick(itemIndex) {
    this.setState({
      focused: this.state.focused,
      selectedItemIndex: itemIndex
    });
  }

  getSelectedItem() {
    return this.props.items && this.props.items[this.state.selectedItemIndex];
  }

  getDisplayedValueOfItem(item) {
    if (!item) {
      return '';
    }
    return this.props.mapItemToDisplayValue ? this.props.mapItemToDisplayValue(item) : item;
  }

  getValueOfItem(item) {
    if (!item) {
      return '';
    }
    return this.props.mapItemToValue ? this.props.mapItemToValue(item) : item;
  }

  clear() {
    this.refs.input.value = '';
  }

  render() {
    return (
      <div className="dropdown">
        <input
          type="text"
          ref="input"
          onFocus={() =>
            this.setState({
              focused: true,
              selectedItemIndex: this.state.selectedItemIndex
            })}
          onBlur={() => this.onBlur()}
          onChange={() => this.onInputChange()}
          onKeyDown={event => this.onKeyDown(event)}
        />
        {this.state.focused &&
          this.props.items && (
            <div className="results">
              <ul>
                {this.props.items.map((item, i) => (
                  <li
                    key={this.getValueOfItem(item)}
                    className={i === this.state.selectedItemIndex && 'active'}
                    onMouseDown={() => this.onItemClick(i)}
                  >
                    {this.getDisplayedValueOfItem(item)}
                  </li>
                ))}
              </ul>
            </div>
          )}
      </div>
    );
  }
}
