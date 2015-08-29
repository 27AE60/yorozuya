'use strict';

var server = require('./server'),
    cfg = require('./config.json');    // app configuration based on env(development, production, test)

var port = process.env.PORT || cfg.port;

server.listen(port, function() {
  console.log('server is up and running on', port);
});
