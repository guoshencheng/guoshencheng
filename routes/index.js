var express = require('express');
var router = express.Router();
var env = process.env.NODE_ENV;
var resourceHash;
try {
  resourceHash = require('../resource-hash.js');
} catch (e) {
  resourceHash = {}
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', env: env, hash: resourceHash.hash });
});

router.get('/mock', function(req, res, next) {
  res.render('mock', { title: 'Express', env: env, hash: resourceHash.hash });
});

router.get('/flow', function(req, res, next) {
  res.render('flow', { title: 'Express', env: env, hash: resourceHash.hash });
});

router.get('/blogs', function(req, res, next) {
  res.render('blog/index', { title: 'Express', env: env, hash: resourceHash.hash });
});

module.exports = router;
