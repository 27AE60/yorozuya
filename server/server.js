var express = require('express');
var bodyParser = require('body-parser');

var mdw = require('./middlewares.js'); // contains all level (Application, Router, etc) middlewares

var yorozuya = express(); // Application instance

yorozuya.use(bodyParser.json()); // accept JSON data, e.g. get JSON data from POST
yorozuya.use(mdw.cors()); // enable Cross Origin Resource Sharing (CORS)
yorozuya.use(require('morgan')('dev')); /* logger */

// Start db connection
yorozuya.use(mdw.createConnection);

// Application routes
yorozuya.use('/events', require('./routes/event.js'));

// Error handlers
yorozuya.use(mdw.logErrors());
yorozuya.use(mdw.clientErrorHandler());
yorozuya.use(mdw.errorHandler());

// Close db connection
yorozuya.use(mdw.closeConnection);

module.exports = yorozuya;
