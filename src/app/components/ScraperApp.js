import React, { Component } from 'react';
import ScraperStore from '../stores/ScraperStore';
import ScraperActions from '../actions/ScraperActions';
import LoginButton from './LoginButton.jsx';

export default class LoginPage extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = ScraperStore.getState().state;

    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    ScraperStore.listen(this._onChange);
    this._checkForToken();
  }

  componentWillUnmount() {
    ScraperStore.unlisten(this._onChange);
  }

  render() {
    return (
      <div>
        <LoginButton />
        <br />
        {this.renderToken()}
      </div>
    );
  }

  // Renders the scraper dialog only if you've authenticated
  renderToken() {
    if (this.state.token) {
      return 'Your token: ' + this.state.token
    }
  }

  _checkForToken() {
    const splitPath = location.href.split('&');
    if (splitPath.length > 1) {
      var token = splitPath[0].split('access_token=')
      token = token[token.length-1]
      ScraperActions.setToken(token);
    }
  }

  _onChange() {
    this.setState(ScraperStore.getState().state);
  }
};
