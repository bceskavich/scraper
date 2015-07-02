import React, { Component } from 'react';
import ScraperActions from '../actions/ScraperActions';
import ScraperStore from '../stores/ScraperStore';

class LoginButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      clientId: null,
      active: 'inactive',
      basePath: ScraperStore.getState().basePath;
    };

    this._getClientId = this._getClientId.bind(this);
    this._updateClientId = this._updateClientId.bind(this);
  }

  componentDidMount() {
    this._getClientId();
  }

  render() {
    if (this.props.token) {
      return <div>Logged In As: {this.props.userName}</div>;
    } else {
      return <a href={this.state.basePath} className={this.state.active}>Login</a>;
    }
  }

  _getClientId() {
    APIUtils.getClientId(this._updateClientId);
  }

  _updateClientId(response) {
    const clientId = response.client_id;
    this.setState((previousState, currentProps) =>
      return {
        clientId: clientId,
        active: 'active',
        basePath: previousState.basePath
      };
    );
  }
}

LoginButton.propTypes = {
  token: React.PropTypes.string.isRequired,
  userName: React.PropTypes.string.isRequired
};

export default LoginButton;
