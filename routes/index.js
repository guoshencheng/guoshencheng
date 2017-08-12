var express = require('express');
var router = express.Router();
var env = process.env.NODE_ENV;
var api = require('./api');
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

router.use('/api', api);

router.get('/mock', function(req, res, next) {
  res.render('mock', { title: 'Express', env: env, hash: resourceHash.hash });
});

router.get('/flow', function(req, res, next) {
  res.render('flow', { title: 'Express', env: env, hash: resourceHash.hash });
});

router.get('/posts', function(req, res, next) {
  res.render('posts/index', { title: 'Express', env: env, hash: resourceHash.hash });
});

module.exports = router;
