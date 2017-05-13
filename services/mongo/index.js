var shortid = require('shortid');
var mongoose = require('mongoose');
var models = require('./models');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/guoshencheng');

var filter = (params) => {
  return (data) => {
    var result = Object.keys(params).reduce((pre, cur) => {
      var key = cur == "_id" ? "id" : cur;
      return Object.assign({}, pre, {
        [key]: data[cur] || data[key]
      })
    }, {});
    return result;
  }
}

var check = (params) => {
  return (data, needId) => {
    if (!(needId && !data.id)) {
      var success = true;
      Object.keys(params).map(key => {
        return key == "_id" ? "id" : key;
      }).filter(key => {
        if (key == "id") {
          return needId;
        } else {
          return true;
        }
      }).forEach(key => {
        if (!data[(key == "_id" ? "id" : key)]) {
          console.log(key, data[(key == "_id" ? "id" : key)])
          success = false;
        }
      });
      return success;
    } else {
      return false;
    }
  }
}

var Models = Object.keys(models).reduce((pre, key) => {
  var params = models[key].params;
  var schema = new Schema(params);
  var Model = mongoose.model(models[key].name, schema)
  return Object.assign({}, pre, {
    [key]: {
      Model, 
      name: models[key].name,
      filter: filter(params), 
      check: check(params)
    }
  });
}, {});

module.exports = Models;
