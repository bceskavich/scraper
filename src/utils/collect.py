import requests
import json
import sys
from facebook import Facebook, FacebookError

def main(group_id, token):
    print 'Starting scrape.'
    print 'Outfile: data.json'

    with open('data.json', 'a') as outfile:
        run_search(group_id, token, outfile)

    print '---'

def run_search(id, token, outfile):
    # Establish API connection
    fb = Facebook(token)

    paging_url = 'none'
    page = 1
    error_count = 0
    while paging_url is not None:
        print 'Scraping page %d' % page
        try:
            if paging_url is not 'none':
                resp = requests.get(paging_url)
                resp = json.loads(resp.content)
            else:
                resp = fb.get_object_feed(id)

            if not resp['data']:
                paging_url = None
                print 'All pages of data collected. Now exiting...'
                pass
            else:
                on_data(resp['data'], outfile)
                if 'paging' not in resp.keys():
                    print 'All pages of data collected. Now exiting...'
                    paging_url = None
                else:
                    paging_url = resp['paging']['next']
                    page += 1
        except FacebookError as e:
            print 'Facebook API refused with error:'
            print e[0]['message']
            if error_count > 5:
                print 'Too many recurring erros. Exiting now...'
            else:
                print 'Trying again.'

def on_data(data, outfile):
    # Loop thru each post
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
            outfile.write(json.dumps(item).encode('utf-8'))
            outfile.write('\n')

        # Catch known data handling errors that could be raised
        except (ValueError, TypeError, KeyError) as e:
            print 'Fatal exception raised upon data handling: %s' % e
        # Need to catch all exceptions b/c we don't want data handling to kill the collector
        except Exception as e:
            print 'Unknown data handling exception caught: %s' % e

if __name__ == '__main__':
    group_id = sys.argv[1]
    token = sys.argv[2]
    main(group_id, token)
