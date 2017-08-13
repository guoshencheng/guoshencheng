var express = require('express');
var router = express.Router();
var middlwares = require('../../../services/middlewares');
var post = middlwares.post;

router.get('/posts', post.all(true));

module.exports = router;
