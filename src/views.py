from flask import render_template

from src import app

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/scrape?token=<string:token>&id=<string:id>', methods=['GET'])
def scrape(token, id):
    """ TODO """

@app.route('/get_id?token=<string:token>&object=<string:object_name', methods=['GET'])
def get_id(token, object_name):
    """ TODO """

"""
TODO - Scraping API

-- get_app_id() - used to retrieve secret app ID
-- start_scrape() -- start the scraping
"""
