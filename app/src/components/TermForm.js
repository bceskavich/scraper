import React, { Component } from 'react';
import ScraperActions from '../actions/ScraperActions';
import ScraperStore from '../stores/ScraperStore';

const ENTER_KEY_CODE = 13;

export default class TermForm extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {text: ''};

    this._onChange = this._onChange.bind(this);
    this.scrape = this.scrape.bind(this);
  }

  render() {
    const placeholder = "Enter Group ID";
    var scraping;
    if (this.props.scraping) {
      scraping = 'Scraping';
    } else {
      scraping = 'Not Scraping';
    }
    return (
      <div>
        <input
          type="text"
          placeholder={placeholder}
          value={this.state.text}
          onChange={this._onChange} />
        <button onClick={this.scrape}>Start Scraping</button>
        {ScraperStore.getState().state.term}
        {scraping}
      </div>
    );
  }

  scrape() {
    const term = this.state.text.trim();
    if (term) {
      ScraperActions.setTerm(term);
      ScraperActions.startScraping();
    }
  }

  _onChange(event) {
    this.setState({text: event.target.value});
  }

}
