var express = require('express');
var router = express.Router();
var middlwares = require('../../../services/middlewares');
var blog = middlwares.blog;
var db = require('../../../db');

router.get('/blogs', blog.all(true));

module.exports = router;
