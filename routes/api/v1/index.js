var express = require('express');
var router = express.Router();
var middlwares = require('../../../services/middlewares');
var post = middlwares.post;

router.get('/posts', post.all(true));
router.get('/posts/:id', post.findById(true, "id"));
router.post('/posts/empty', post.createEmpty(true));

module.exports = router;
