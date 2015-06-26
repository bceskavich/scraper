import $ from 'jQuery';
import React, { Component } from 'react';

export default class LoginButton extends Component {
  static propTypes = {
    setToken: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);

    const clientId = 'TODO';
    const redirectUri = 'http://localhost:3000';
    const responseType = 'token';
    this.requestPath = 'https://www.facebook.com/dialog/oauth?client_id=' +
      clientId + '&redirect_uri=' + redirectUri + '&response_type=' + responseType;
  }

  // TODO - parse and set token

  render() {
    return <a href={this.requestPath}>Login w/ Facebook</a>;
  }
}
