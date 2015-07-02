import alt from '../alt';
import ScraperActions from '../actions/ScraperActions';

class ScraperStore {
  constructor() {
    this.bindActions(ScraperActions);

    // State Values
    this.token = null;
    this.term = null;
    this.termId = null;
    this.userName = null;
    this.scraping = false;
  }

  onSetUserInfo(payload) {
    this.token = payload.token;
    this.userName = payload.userName;
  }

  onSetTerm(term) {
    this.term = term;
  }

  onSetTermId(termId) {
    this.termId = termId;
  }

  onIsScraping(status) {
    this.scraping = status;
  }
}

export default alt.createStore(ScraperStore, 'ScraperStore');
