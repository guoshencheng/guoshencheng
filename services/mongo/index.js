var shortid = require('shortid');
var mongoose = require('mongoose');
var models = require('./models');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://120.27.216.30/guoshencheng');
var Models = Object.keys(models).reduce((pre, key) => {
  var schema = new Schema(models[key].params);
  var Model = mongoose.model(models[key].name, schema)
  return Object.assign({}, pre, {
    [key]: {
      Model, name: models[key].name
    }
  });
}, {})
module.exports = Models;
