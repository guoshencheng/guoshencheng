var express = require('express');
var router = express.Router();
var middlwares = require('../../../services/middlewares');
var constrollers = require('../../../services/controllers')
var post = middlwares.post;

router.put('/posts/:id', post.update(true, "id"));
router.put('/posts/:id/status/:status', post.changeStatus(true, "id", "status"));
router.get('/posts', post.all(true));
router.get('/posts/online', post.allOnline(true));
router.get('/posts/:id', post.findById(true, "id"));
router.post('/posts/empty', post.createEmpty(true));

router.get('/tips', constrollers.v1.tip.findAll);
router.get('/tips/search', constrollers.v1.tip.search);
router.post('/tips', constrollers.v1.tip.create);
router.get('/tips/:id', constrollers.v1.tip.findById);
router.put('/tips/:id', constrollers.v1.tip.update);

module.exports = router;
