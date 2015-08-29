var express = require('express');
var router = express.Router();

var r = require('rethinkdb');

function handleError(res, error) {
  console.log('error', error);
  return res.status(500).send({error: error.message});
}

router.get('/:id', function(req, res, next) {
  var params = req.query;
  console.log('params', params);

  r.db('yorozuya').table('users').filter(r.row('id').eq(params.id)).
    run(req._rdbConn, function(err, cursor) {
    if (err) throw err;

    cursor.toArray(function(err, result) {
      if (err) throw err;
      res.status(200).send(JSON.stringify(result, null, 2));
    });
  });
});

/* post an event */
router.post('/', function(req, res, next) {
  var params = req.body;
  params.createdAt = r.now();

  r.db('yorozuya').table('users').insert(params, {returnChanges: true}).run(req._rdbConn, function(error, result) {
    if (error) {
      handleError(res, error)
    }
    else if (result.inserted !== 1) {
      handleError(res, new Error("Document was not inserted."))
    }
    else {
      res.status(201).send(JSON.stringify(result.changes[0].new_val));
    }

    next();
  });
});

module.exports = router;
