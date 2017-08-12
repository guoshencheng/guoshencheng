var express = require('express');
var router = express.Router();
var db = require('../../../db');

router.get('/blogs', (req, res, next) => {
  db.Blog.all().then(docs => {
    res.json(docs);
  }).catch(next);
})

module.exports = router;
