var express = require('express');
var router = express.Router();
var middlwares = require('../../../services/middlewares');
var controllers = require('../../../services/controllers')
var post = middlwares.post;

router.get('/posts/tags', controllers.v1.postTag.all);
router.get('/posts/tags/:id', controllers.v1.postTag.findById);
router.get('/posts/tags/:id/posts', controllers.v1.post.findByTag);

router.put('/posts/:id', post.update(true, "id"));
router.put('/posts/:id/status/:status', post.changeStatus(true, "id", "status"));
router.get('/posts', post.all(true));
router.get('/posts/online', post.allOnline(true));
router.get('/posts/:id', post.findById(true, "id"));
router.post('/posts/empty', post.createEmpty(true));

router.get('/tips', controllers.v1.tip.findAll);
router.get('/tips/search', controllers.v1.tip.search);
router.post('/tips', controllers.v1.tip.create);
router.get('/tips/:id', controllers.v1.tip.findById);
router.delete('/tips/:id', controllers.v1.tip.deleteById);
router.put('/tips/:id', controllers.v1.tip.update);

module.exports = router;
