import * as $ from 'jQuery';
import alt from '../alt';
import FSStore from '../stores/FSStore';

class FSActions {
  setToken(token) {
    return token;
  }

  setTerm(term) {
    return term;
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
      const state = FSStore.getState();
      setTimeout(() => {
        dispatch(false);
      }, 5000);

    }
  }

  startScraping(start, end) {
    scrapeData(start, end);
    return true;
  }
}

export default alt.createActions(FSActions);
