var express = require('express');
var passport = require('passport');
var env = process.env.NODE_ENV || "development";
var router = express.Router();
var middlwares = require('../../services/middlewares/index')
var { ApiErrorHandler } = require('../../services/middlewares/error');
var api = require('./api');

var resourceHash;
try {
  resourceHash = require('../../resource-hash.js');
} catch (e) {
  resourceHash = {}
}

router.use('/api', api, ApiErrorHandler)
router.get('/', middlwares.auth.checkAuth('/mockServer/auth/github'), (req, res, next) => {
  res.render('mockServer', { env: env, hash: resourceHash.hash });
})
router.get('/auth/github', passport.authenticate('github_mock_server', { scope: [ 'user:email' ] }));
router.get('/auth/github/callback', passport.authenticate('github_mock_server', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/mockServer');
});

module.exports = router;
