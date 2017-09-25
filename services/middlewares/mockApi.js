var db = require('../../db')
var pathToRegExp = require('path-to-regexp');
var apiMethods = require('../../constant/apiMethods');

var findByPath = (pathKey, projectIdKey, isEnd) => (req, res, next) => {
  const id = req.params[projectIdKey];
  const apiPath = req.params[pathKey]
  db.MockApi.findAll({ where: {
    projectId: id
  }}).then(docs => {
    if (docs) {
      const api = docs.reduce((pre, doc) => {
        if (pathToRegExp(doc.apiPath).test(`/${apiPath}`) && apiMethods[doc.apiMethod] == req.method) {
          return doc;
        } else {
          return pre;
        }
      }, undefined)
      if (api) {
        if (isEnd) {
          res.json(api)
        } else {
          req.custom.mockApi = api;
          next()
        }
      } else {
        next(new error(`mock server api path ${apipath} method ${req.method} in project id ${id} not find`))
      }
    } else {
      next(new error(`mock server api path ${apipath} method ${req.method} in project id ${id} not find`))
    }
  }).catch(next);
}


module.exports = {
  findByPath
}
