import { SET_TOKEN, SET_TERM, SCRAPE_COMPLETED, SCRAPE_STARTED } from '../constants/ActionTypes';

const state = {
  token: null,
  term: null,
  scraping: false
};

export default function auth(state=state, action) {
  switch (action.type) {

    case SET_TOKEN:
      return state.token = action.token;

    case SET_TERM:
      return state.term = action.term;

    case SCRAPE_COMPLETED:
      return state.scraping = false;

    case SCRAPE_STARTED:
      return state.scraping = true;

    default:
      return state;
  }
}
