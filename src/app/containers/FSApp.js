import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'redux/react';
import LoginPage from '../components/LoginPage.react';
import * as FSActions from '../actions/FSActions';

@connection(state => ({
  auth: state.auth
}))
export default class FSApp {
  render() {
    const { auth, dispatch } = this.props;
    const actions = bindActionCreators(FSActions, dispatch);
    return (
      <LoginPage auth={auth} actions={actions} />
    );
  }
}
