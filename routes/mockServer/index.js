var express = require('express');
var router = express.Router();
var api = require('./api');

router.use('/api', api)

module.exports = router;
