var express = require('express');
var router = express.Router();
var middlwares = require('../../../services/middlewares');
var controllers = require('../../../services/controllers')

router.get('/posts/tags', controllers.v1.postTag.all);
router.get('/posts/tags/:id', controllers.v1.postTag.findById);

router.get('/posts/tags/:id/posts', controllers.v1.post.findByTag);
router.put('/posts/:id', controllers.v1.post.update);
router.put('/posts/:id/status/:status', controllers.v1.post.changeStatus);
router.get('/posts', controllers.v1.post.all);
router.get('/posts/online', controllers.v1.post.allOnline);
router.get('/posts/:id', controllers.v1.post.findById);
router.post('/posts/empty', controllers.v1.post.createEmpty);

router.get('/tips', controllers.v1.tip.findAll);
router.get('/tips/search', controllers.v1.tip.search);
router.post('/tips', controllers.v1.tip.create);
router.get('/tips/:id', controllers.v1.tip.findById);
router.delete('/tips/:id', controllers.v1.tip.deleteById);
router.put('/tips/:id', controllers.v1.tip.update);

module.exports = router;
