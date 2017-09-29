var express = require('express');
var router = express.Router();
var env = process.env.NODE_ENV || "development";
var api = require('./api');
var mockServer = require('./mockServer/index')
var middlwares = require('../services/middlewares');
var marked = require('marked');
var passport = require('passport');
var moment = require('moment')

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

router.get('/auth/github', passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', env: env, hash: resourceHash.hash });
});

router.use('/api', api);
router.use('/mockServer', mockServer)

router.get('/mock', function(req, res, next) {
  res.render('mock', { title: 'Express', env: env, hash: resourceHash.hash });
});

router.get('/manage', middlwares.auth.checkAuth(), function(req, res, next) {
  const authUser = req.custom.authUser;
  if (authUser && authUser.power >= 100) {
    res.render('manage/index', { env: env, hash: resourceHash.hash });
  } else {
    next(new Error('你没有权限'))
  }
});

router.get('/flow', function(req, res, next) {
  res.render('flow', { title: 'Express', env: env, hash: resourceHash.hash });
});

router.get('/posts/:id', middlwares.post.findById(false, "id"), function(req, res, next) {
  let { post = {} } = req.custom;
  post = post.toJSON();
  const { markdown = "" } = post;
  const html = marked(markdown);
  post.created = moment(post.created_at).format('MMM.DD YYYY');
  // res.send(html);
  // res.end();
  res.render('posts/post', { author, title: 'Express', env: env, hash: resourceHash.hash, html, post });
});

router.get('/posts', middlwares.post.allOnline(false), function(req, res, next) {
  var { posts = [] } = req.custom;
  posts = posts.map(post => post.toJSON()).map(post => Object.assign({}, post, {
    created: moment(post.created_at).format('MMM.DD YYYY')
  }))
  res.render('posts/index', { author, title: 'Express', env: env, hash: resourceHash.hash, posts });
});

module.exports = router;
