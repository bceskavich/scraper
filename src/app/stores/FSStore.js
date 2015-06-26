import alt from '../alt';
import FSActions from '../actions/FSActions';

class FSStore {
  constructor() {
    this.bindListeners({
      setToken: FSActions.setToken,
      setTerm: FSActions.setTerm,
      isScraping: [FSActions.scrapeData, FSActions.startScraping]
    });

    this.state = {
      token: null,
      term: null,
      scraping: false
    };
  }

  setToken(token) {
    var currentState = this.getState();
    currentState.token = token;
    this.setState(currentState);
  }

  setTerm(term) {
    var currentState = this.getState();
    currentState.term = term;
    this.setState(currentState);
  }

  isScraping(status) {
    var currentState = this.getState();
    currentState.scraping = status;
    this.setState(currentState);
  }
}

export default alt.createStore(FSStore, 'FSStore');
