var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Twitter Feeds - Node.JS + Express.JS + Angular.JS' });
});

module.exports = router;