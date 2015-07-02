import React, { Component } from 'react';
import ScraperStore from '../stores/ScraperStore';
import LoginButton from './LoginButton';
import TermForm from './TermForm';

export default class ScraperApp extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = ScraperStore.getState().state;

    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    ScraperStore.listen(this._onChange);
  }

  componentWillUnmount() {
    ScraperStore.unlisten(this._onChange);
  }

  render() {
    return (
      <div>
        <LoginButton
          token={this.state.token}
          userName={this.state.userName}
        />
        <TermForm info={this.state} />
      </div>
    );
  }

  _onChange() {
    this.setState(ScraperStore.getState());
  }
};
