var express = require('express');
var router = express.Router();
var middlwares = require('../../../services/middlewares/index');
var mockServer = require('../../../services/controllers/mockServer');
var v1 = require('./v1');

router.use('/v1', middlwares.auth.checkAuth('/mockServer/auth/github'), v1);
router.use('/:projectId/*', mockServer.getMockData)

module.exports = router;
