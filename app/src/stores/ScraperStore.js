import alt from '../alt';
import ScraperActions from '../actions/ScraperActions';

class ScraperStore {
  constructor() {
    this.bindActions(ScraperActions);

    this.userInfo = {
      token: "",
      term: "",
      termId: "",
      userName: "",
      scraping: null
    };

    const loginParams = {
      redirectUri: 'http://localhost:5000',
      responseType: 'token',
      scope: 'public_profile,user_groups,user_posts'
    }
    this.basePath = 'https://www.facebook.com/dialog/oauth?redirect_uri=' +
                    loginParams.redirectUri + '&response_type=' +
                    loginParams.responseType + '&scope=' + loginParams.scope;
  }

  onSetUserInfo(payload) {
    this.userInfo.token = payload.token;
    this.userInfo.userName = payload.userName;
  }

  onSetTerm(term) {
    this.userInfo.term = term;
  }

  onSetTermId(termId) {
    this.userInfo.termId = termId;
  }

  onIsScraping(status) {
    this.userInfo.scraping = status;
  }
}

export default alt.createStore(ScraperStore, 'ScraperStore');
