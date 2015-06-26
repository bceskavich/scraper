import * as $ from 'jQuery';
import * as ActionTypes from '../constants/ActionTypes';

export function setToken(token) {
  return {
    type: ActionTypes.SET_TOKEN,
    token: token
  };
}

export function setTerm(term) {
  return {
    type: ActionTypes.SET_TERM,
    term: term
  };
}

export function scrapeData(start, end) {
  return (dispatch, getState) => {
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
    const { auth } = getState();
    setTimeout(() => {
      dispatch({
        type: ActionTypes.SCRAPE_COMPLETED
      });
    }, 5000);

  }
}

export function startScraping(start, end) {
  scrapeData(start, end);
  return {
    type: ActionTypes.SCRAPE_STARTED
  };
}
