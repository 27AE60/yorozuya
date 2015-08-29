'use strict';

var errors = {
  content: 'INVALID_CONTENT_TYPE',
  server: 'INTERNAL_SERVER_ERROR'
};

// Enforce json type
exports.setAcceptJSON = function() {
  return function(req, res, next) {
    res.set({
      'Content-Type': 'application/json'
    });

    if (!req.headers['content-type'] || req.headers['content-type'] != 'application/json') {
      res.status(400).send({
        err: errors.content,
        msg: 'Content type not valid, should be json.'
      });
      return;
    }

    next();
  };
};

// CORS middleware
exports.cors = function() {
  return function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", ['POST','GET','DELETE','PUT']);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  };
};

// log error information to STDERR
exports.logErrors = function() {
  return function(err, req, res, next) {
    console.error(err.stack);
    next(err);
  };
};

// abstract error message for clients
exports.clientErrorHandler = function() {
  return function(err, req, res, next) {
    if (req.xhr) {
      res.status(500).send({ error: errors.server });
    } else {
      next(err);
    }
  };
};

// catch-all error implementation
exports.errorHandler = function() {
  return function(err, req, res, next) {
    res.status(500);
    res.render('error', { error: err });
  };
};
