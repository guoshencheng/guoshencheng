var express = require('express');
var router = express.Router();
var blog = require('../services/middlewares/mongo/blog.js');

router.get('/blogs', blog.findMany);
router.get('/blogs/:id', blog.find);
router.post('/blogs', blog.create);
router.put('/blogs', blog.update);

module.exports = router;
