import React, { Component } from 'react';
import ScraperActions from '../actions/ScraperActions';

const loginParams = {
  clientId: '419300968276124',
  redirectUri: 'http://localhost:8888',
  responseType: 'token',
}
const loginPath = 'https://www.facebook.com/dialog/oauth?client_id=' +
      loginParams.clientId + '&redirect_uri=' + loginParams.redirectUri + '&response_type=' + loginParams.responseType;

export default class LoginButton extends Component {

  // TODO - parse and set token

  render() {
    return <a href={loginPath}>Login w/ Facebook</a>;
  }
}
