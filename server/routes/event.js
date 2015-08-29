var express = require('express');
var router = express.Router();

var r = require('rethinkdb');

function handleError(res, error) {
  console.log('error', error);
  return res.status(500).send({error: error.message});
}

/* get events list, filter by userId, startingAt and endingAt */
router.get('/', function(req, res, next) {
  var params = req.query;
  console.log('params', params);
  return res.status(200).send("Yo Baby! On a Roll");
});

/* post an event */
router.post('/', function(req, res, next) {
  var params = req.body;
  params.createdAt = r.now();
  params.startingAt = new Date(params.startingAt);
  params.endingAt = new Date(params.endingAt);

  r.db('yorozuya').table('events').insert(params, {returnChanges: true}).run(req._rdbConn, function(error, result) {
    if (error) {
      handleError(res, error)
    }
    else if (result.inserted !== 1) {
      handleError(res, new Error("Document was not inserted."))
    }
    else {
      console.log('wtf', JSON.stringify(result.changes[0].new_val));
      res.status(201).send(JSON.stringify(result.changes[0].new_val));
    }
    next();
  });
});

module.exports = router;
