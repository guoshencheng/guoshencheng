var express = require('express');
var router = express.Router();
var { ApiErrorHandler } = require('../../services/middlewares/error');
var api = require('./api');

router.use('/api', api, ApiErrorHandler)

module.exports = router;
