import alt from '../alt';
import ScraperActions from '../actions/ScraperActions';

class ScraperStore {
  constructor() {

    this.bindListeners({
      onSetToken: ScraperActions.SET_TOKEN,
      onSetTerm: ScraperActions.SET_TERM,
      onIsScraping: ScraperActions.IS_SCRAPING
    });

    this.state = {
      token: null,
      term: null,
      scraping: false
    };
  }

  onSetToken(token) {
    var currentState = this.state;
    currentState.token = token;
    this.setState(currentState);
  }

  onSetTerm(term) {
    var currentState = this.state;
    currentState.term = term;
    this.setState(currentState);
  }

  onIsScraping(status) {
    var currentState = this.state;
    currentState.scraping = status;
    this.setState(currentState);
  }
}

export default alt.createStore(ScraperStore, 'ScraperStore');
