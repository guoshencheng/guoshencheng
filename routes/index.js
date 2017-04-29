var express = require('express');
var index = express.Router();
var db = require('./db');

/* GET home page. */
index.get('/', function(req, res, next) {
  res.render('home', { title: 'Express' });
});

module.exports = {
  index, db
}
