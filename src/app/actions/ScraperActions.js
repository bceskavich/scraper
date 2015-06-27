import alt from '../alt'
import ScraperStore from '../stores/ScraperStore'

class ScraperActions {

  setToken(token) {
    this.dispatch(token);
  }

  setTerm(term) {
    this.dispatch(term);
  }

  isScraping(status) {
    this.dispatch(status);
  }

  scrapeData(start, end) {
    return (dispatch) => {
      /*
      const { auth } = getState();
      $.ajax({
        url: '../utils/collect.py',
        data: {start: start, end: end, token: auth.token},
        dataType: 'json'
      }).done(function(response) {
        dispatch({
          type: ActionTypes.SCRAPE_COMPLETED,
          data: response
        });
      });*/
      // Testing async for now
      const state = ScraperStore.getState();
      setTimeout(() => {
        this.isScraping(false);
      }, 5000);

    }
  }

  startScraping(start, end) {
    this.actions.isScraping(true);
    this.actions.scrapeData(start, end);
  }
}

export default alt.createActions(ScraperActions);
