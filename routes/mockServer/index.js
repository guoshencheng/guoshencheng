var express = require('express');
var env = process.env.NODE_ENV || "development";
var router = express.Router();
var middlwares = require('../../services/middlewares/index')
var { ApiErrorHandler } = require('../../services/middlewares/error');
var api = require('./api');

var resourceHash;
try {
  resourceHash = require('../resource-hash.js');
} catch (e) {
  resourceHash = {}
}

router.use('/api', api, ApiErrorHandler)
router.get('/', middlwares.auth.checkAuth, (req, res, next) => {
  res.render('mockServer', { env: env, hash: resourceHash.hash });
})

module.exports = router;
