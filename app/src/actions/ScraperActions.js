import alt from '../alt'
import ScraperStore from '../stores/ScraperStore'

class ScraperActions {

  constructor() {
    this.generateActions(
      'setToken',
      'setTerm',
      'isScraping'
    );
  }

  scrapeData() {
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
    console.log('Starting timeout.');
    setTimeout(() => {
      this.actions.isScraping(false);
    }, 1000)
  }

  startScraping() {
    this.actions.isScraping(true);
    this.actions.scrapeData();
  }
}

export default alt.createActions(ScraperActions);
