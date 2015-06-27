import React, { Component } from 'react';
import ScraperStore from '../stores/ScraperStore';
import LoginButton from './LoginButton.jsx';

export default class LoginPage extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {auth: ScraperStore.getState()};
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
        {this.renderLogin()}
      </div>
    );
  }

  // Renders the Login component only if not already logged in
  renderLogin() {
    if (!this.state.auth.token) {
      return (
        <LoginButton />
      );
    }
  }

  // Renders the scraper dialog only if you've authenticated
  renderScraper() {
    return;
  }

  _onChange() {
    this.setState({auth: ScraperStore.getState()});
  }
};
