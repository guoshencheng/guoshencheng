var express = require('express');
var router = express.Router();
var env = process.env.NODE_ENV;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', env: env });
});

module.exports = router;
