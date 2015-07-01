from flask import render_template, request, jsonify

from src import app

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/scrape/', methods=['GET'])
def scrape():
    if request.method == 'GET':
        token = request.args.get('token', None)
        fb_id = request.args.get('id', None)

        if token is None or fb_id is None:
            resp = {
                'data': None,
                'status': 0,
                'message': 'Invalid parameters. Please provide a token and id.'
            }
        else:
            # TODO - actually call the scraper function
            resp = {'todo': 'TODO'}

    return jsonify(resp)

@app.route('/get_id/<string:object_name>', methods=['GET'])
def get_id(object_name):
    """ TODO """

"""
TODO - Scraping API

-- get_app_id() - used to retrieve secret app ID
-- start_scrape() -- start the scraping
"""
