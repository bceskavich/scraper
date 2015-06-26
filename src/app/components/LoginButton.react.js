import $ from 'jQuery';
import { Component } from 'react';
import FSActions from '../actions/FSActions';

const loginParams = {
  clientId: 'TODO',
  redirectUri: 'http://localhost:3000',
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
