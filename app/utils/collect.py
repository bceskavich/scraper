import requests
import json
import os

# from app import app
from facebook import Facebook, FacebookError

class Scraper(object):

    def __init__(self, token, username, term, term_id):
        self.token = token
        self.username = username
        self.term = term
        self.term_id = term_id

        self.outdir = os.path.abspath(os.path.dirname(__file__)) + '/data/' + self.username + '/'
        # self.outdir = app.config['BASEDIR'] + '/data/' + self.username + '/'
        self.outfile = self.outdir + self.term + '-out.json'

        if not os.path.exists(self.outdir):
            os.makedirs(self.outdir)

    def collect(self):
        with open(self.outfile, 'a') as outfile_open:
            request_error_count, parsing_error_count = self.run_search(outfile_open)

        resp = {
            'data': None,
            'status': 201,
            'message': 'Scraping completed.',
            'request_errors': request_error_count,
            'parsing_errors': parsing_error_count
        }

        return resp

    def run_search(self, outfile_open):
        fb = Facebook(self.token)

        paging_url = 'none'
        page = 1
        request_error_count = 0
        parsing_error_count = 0

        while paging_url is not None:
            print 'Scraping page %d' % page

            try:
                if paging_url is not 'none':
                    resp = requests.get(paging_url)
                    resp = json.loads(resp.content)
                else:
                    resp = fb.get_object_feed(self.term_id)

                if not resp['data']:
                    paging_url = None
                    print 'All pages of data collected. Now exiting...'
                    pass
                else:
                    run_count = self.on_data(resp['data'], outfile_open)
                    parsing_error_count += run_count
                    if 'paging' not in resp.keys():
                        print 'All pages of data collected. Now exiting...'
                        paging_url = None
                    else:
                        paging_url = resp['paging']['next']
                        page += 1
            except FacebookError as e:
                print 'Facebook API refused with error:'
                print e[0]['message']
                if request_error_count > 5:
                    print 'Too many recurring erros. Exiting now...'
                    paging_url = None
                else:
                    print 'Trying again.'

        return request_error_count, parsing_error_count

    def on_data(self, data, outfile_open):
        parsing_error_count = 0

        for item in data:
            try:
                # First, if there are likes & a paging key, page thru
                if 'likes' in item.keys() and 'next' in item['likes']['paging'].keys():
                    paging_url = item['likes']['paging']['next']

                    # Now loop thru until no more comments to page thru
                    while paging_url is not None:
                        resp = requests.get(paging_url)
                        resp = json.loads(resp.content)

                        # Add likes to the data item
                        for like in resp['data']:
                            item['likes']['data'].append(like)

                        if 'next' in resp['paging'].keys():
                            paging_url = resp['paging']['next']
                        else:
                            # If no more 'next' key the page has finished
                            paging_url = None

                # Same thing for comments
                if 'comments' in item.keys() and 'next' in item['comments']['paging'].keys():
                    paging_url = item['comments']['paging']['next']

                    # Now loop thru until no more comments to page thru
                    while paging_url is not None:
                        resp = requests.get(paging_url)
                        resp = json.loads(resp.content)

                        # Add likes to the data item
                        for comment in resp['data']:
                            item['comments']['data'].append(comment)

                        if 'next' in resp['paging'].keys():
                            paging_url = resp['paging']['next']
                        else:
                            # If no more 'next' key the page has finished
                            paging_url = None

                # Finally, write the line to our outfile
                outfile_open.write(json.dumps(item).encode('utf-8'))
                outfile_open.write('\n')

            # Catch known data handling errors that could be raised
            except (ValueError, TypeError, KeyError) as e:
                print 'Fatal exception raised upon data handling: %s' % e
                parsing_error_count += 1
            # Need to catch all exceptions b/c we don't want data handling to kill the collector
            except Exception as e:
                print 'Unknown data handling exception caught: %s' % e
                parsing_error_count += 1

        return parsing_error_count

if __name__ == '__main__':

    token = 'CAACEdEose0cBAM9k9SHzgMakZARVhwAtQ6SH5lQUA0Bo1TmQWLPDRr1EuEOz916ZBmFbwsXVi7lZBFfKRT1mEZCxkj2g0YeGS3YXycDxcWg3pKXmtFMZCJUwGI3ZAJCkHrInaLAZAZBzop9zQO605fZBZBrhTnmGMIlj1tqSdpCGqH0xDrLEHVx5EMr53bML45eiYgofANUQigtGI14jrXQoZCJYZBmhbbxdgkkZD'
    term = 'tedcruzpage'

    fb = Facebook(token)
    term_id = fb.get_object_id(term)

    c = Scraper(token, 'ceskavich', term, term_id)
    resp = c.collect()
    print json.dumps(resp, indent=1)
