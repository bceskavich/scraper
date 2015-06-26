import { Component } from 'react';
import FSSTore from '../stores/FSSTore';
import LoginButton from './LoginButton.react';
import Scraper from './Scraper.react';

export default class LoginPage extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {auth: FSSTore.getState()};
  }

  componentDidMount() {
    FSSTore.listen(this._onChange);
  }

  componentWillUnmount() {
    FSSTore.unlisten(this._onChange);
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
    if (this.state.auth.token) {
      return (
        <Scraper auth={this.state.auth} />
      );
    }
  }

  _onChange() {
    this.setState({auth: FSSTore.getState()});
  }
}
