var express = require('express');
var router = express.Router();
var env = process.env.NODE_ENV;
var api = require('./api');
var middlwares = require('../services/middlewares');
var author = {
  name: "Century Guo",
  email: "guoshencheng1@gmail.com"
}
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

router.get('/manage', function(req, res, next) {
  res.render('manage/index', { env: env, hash: resourceHash.hash });
});

router.get('/flow', function(req, res, next) {
  res.render('flow', { title: 'Express', env: env, hash: resourceHash.hash });
});

router.get('/posts', middlwares.post.allOnline(false), function(req, res, next) {
  const { posts = [] } = req.custom;
  res.render('posts/index', { author, title: 'Express', env: env, hash: resourceHash.hash, posts });
});

module.exports = router;
