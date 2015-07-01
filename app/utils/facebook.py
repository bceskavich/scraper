import requests
import json


class Facebook(object):

    def __init__(self, token):
        """
        :param token: str FB access token
        """
        self.access_token = token
        self.base_url = 'https://graph.facebook.com/v2.3'

    def get_object_feed(self, endpoint, limit=250, since=None, until=None):
        """
        Public method to grab feed from an object

        :param endpoint: str FB endpoint
        :param since: YYYY-MM-DD formatted date as a lower-boundary limit (optional)
        :param until: YYYY-MM-DD formatted date as an upper-bound (optional)
        :returns: resp
        """
        endpoint_id = self.get_object_id(endpoint)
        url = self.base_url + '/' + endpoint_id + '/feed'

        params = {'limit': limit, 'access_token': self.access_token}
        if since is not None:
            params['since'] = since
        if until is not None:
            params['until'] = until

        resp = requests.get(url, params=params)
        resp = json.loads(resp.content)

        if 'error' in resp.keys():
            raise FacebookError(resp)

        return resp

    def get_object_id(self, object):
        """
        Public method to get an ID value for an object name

        :param object: str object name for the endpoint
        """
        url = self.base_url + '/' + object
        params = {'access_token': self.access_token}

        resp = requests.get(url, params=params)
        resp = json.loads(resp.content)

        if 'error' in resp.keys():
            raise FacebookError(resp)

        id = resp['id']
        return id

    def is_valid(self, object_name):
        """
        Queries the Facebook API to see if the input is valid.
        Currently Supported: Personal Account, Public Pages, Public Groups (w/ ID)
        """
        try:
            resp = self.get_object_id(object_name)
            return True
        except FacebookError as e:
            return False


class FacebookError(Exception):

    def __init__(self, resp):
        self.result = resp
        self.type = self.result['error']['code']
        self.message = self.result['error']['message']

        self.err = {'message': self.message, 'code': self.type}

        Exception.__init__(self, self.err)


if __name__ == '__main__':
    TOKEN = 'CAACEdEose0cBAJWcQ3K6EImJ4XvonJfBAqZBdcEZABS4znzgX2ihV61yAfj2hBbJosBGBBpX0WUPsWZAomINDiqREmOcZAPG9ZBLDfLSTaN8ITZABxsaR0EF7vDnavz4Gxq4iFlrxUZCJeHDCgOnZAI5B8vTHGG8kiJxSecfEKnBoPtaBoNohmjOZB9IZCZA5nsQ9lI209r4WehHUQG2qD5QaPZC'
    ENDPOINT = 'tedcruzpage'
    FB = Facebook(TOKEN)

    if FB.is_valid(ENDPOINT):
        data = FB.get_object_feed(ENDPOINT)
        print json.dumps(data, indent=1)
    else:
        print 'Invalid endpoint!'
