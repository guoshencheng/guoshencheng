var db = require('../../db')
var pathToRegExp = require('path-to-regexp');
var apiMethods = require('../../constant/apiMethods');

var findByPath = (pathKey, projectIdKey) => async (req, res, next) => {
  const id = req.params.projectId;
  const apiPath = req.params[pathKey]
  try {
    const mockApis = await db.MockApi.findAll({ where: {
      projectId: id
    }})
    if (docs) {
      const api = mockApis.filter(mockApi => pathToRegExp(mockApi.apiPath).test(`/${apiPath}`) && apiMethods[mockApi.apiMethod] == req.method)[0]
      if (api) {
        res.json(api)
      } else {
        next(new error(`mock server api path ${apipath} method ${req.method} in project id ${id} not find`))
      }
    } else {
      next(new error(`mock server api path ${apipath} method ${req.method} in project id ${id} not find`))
    }
  } catch (e) {
    next(e)
  }
}


module.exports = {
  findByPath
}
