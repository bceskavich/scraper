import requests
import json


class Facebook(object):

    def __init__(self, token):
        """
        :param token: str FB access token
        """
        self.access_token = token
        self.base_url = 'https://graph.facebook.com/v2.3'

    def get_object_feed(self, id, limit=250, since=None, until=None):
        """
        Public method to grab feed from an object

        :param id: str FB page_id (required)
        :param since: YYYY-MM-DD formatted date as a lower-boundary limit (optional)
        :param until: YYYY-MM-DD formatted date as an upper-bound (optional)
        :returns: resp
        """
        url = self.base_url + '/' + id + '/about'

        params = {'limit': limit, 'access_token': self.access_token}
        if since is not None:
            params['since'] = since
        if until is not None:
            params['until'] = until

        resp = requests.get(url, params=params)
        print resp
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


class FacebookError(Exception):
    def __init__(self, resp):
        self.result = resp
        self.type = self.result['error']['code']
        self.message = self.result['error']['message']

        self.err = {'message': self.message, 'code': self.type}

        Exception.__init__(self, self.err)


if __name__ == '__main__':
    TOKEN = 'CAAF9Wh1EoJwBALRxcPFfKrfFa7hc3rma7gxZAJcdUZCEbHZAGozRTcpePHkORqlsIj0TG9CkYM2I4vlCPw71603pdK7TZCR4kw7qDKpW6ZCwBqzDTVI3c8qhq9oUdU3OXmhKhCpsZCpEVPzZB4SREwW8FdIJmy2NSPelc8qIoW7xRE5ckM7ZCZAff0e2zbGN1wWtEWaV167r8ZCsOF0lgRsM3g'

    try:
        fb = Facebook(TOKEN)
        data = fb.get_object_feed('378775635466826')
        print json.dumps(data, indent=1)
    except FacebookError as e:
        print e[0]
