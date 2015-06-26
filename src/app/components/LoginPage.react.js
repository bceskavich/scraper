import React, { Component } from 'react';
import LoginButton from './LoginButton.react';
import Scraper from './Scraper.react';

export default class LoginPage extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  };

  render() {
    return (
      <div>
        {this.renderLogin()}
        {this.renderScraper()}
      </div>
    );
  }

  // Renders the Login component only if not already logged in
  renderLogin() {
    const { auth, actions } = this.props;
    if (!auth.token) {
      return (
        <LoginButton setToken={setToken} />
      );
    }
  }

  // Renders the scraper dialog only if you've authenticated
  renderScraper() {
    const { auth, actions } = this.props;
    if (auth.token) {
      return (
        <Scraper auth={auth} actions={actions} />
      );
    }
  }
}
