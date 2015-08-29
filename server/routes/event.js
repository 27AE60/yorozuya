var express = require('express');
var router = express.Router();

/* get events list */
router.get('/', function(req, res) {
  return res.status(200).send("Yo Baby! On a Roll");
});

module.exports = router;
