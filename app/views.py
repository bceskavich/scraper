from flask import render_template, request, jsonify

from app import app

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/scrape/', methods=['GET'])
def scrape():
    if request.method == 'GET':
        token = request.args.get('token', None)
        fb_id = request.args.get('id', None)

        if token is not None or fb_id is not None:
            # TODO - actually call the scraper function
            pass
        else:
            resp = {
                'data': None,
                'status': 401,
                'message': 'Invalid parameters. Please provide a token and id.'
            }

    return jsonify(resp)

@app.route('/get_id/<string:object_name>', methods=['GET'])
def get_id(object_name):
    """ TODO """

"""
TODO - Scraping API

-- get_app_id() - used to retrieve secret app ID
-- start_scrape() -- start the scraping
"""
