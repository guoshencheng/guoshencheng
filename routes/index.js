var express = require('express');
var index = express.Router();
var db = require('./db');

/* GET home page. */
index.get('/', function(req, res, next) {
  var env = process.env.NODE_ENV || "develop";
  res.render('home', { env });
});

module.exports = {
  index, db
}
