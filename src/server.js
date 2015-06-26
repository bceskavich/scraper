var path = require('path');
var Express = require('express');

var app = Express();
var server;

var DIST_PATH = path.resolve(__dirname, './build');
app.use(Express.static(DIST_PATH));

// Standard index
app.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname, './views/index.html'));
});

server = app.listen(process.env.PORT || 8888, function(){
  var port = server.address().port;
  console.log('Server is listening at %s', port);
});
