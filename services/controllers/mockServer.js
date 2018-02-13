var db = require('../../db');
var pathToRegExp = require('path-to-regexp');
var apiMethods = require('../../constant/apiMethods');
var Mock = require('mockjs');

const getMockData = async (req, res, next) => {
  const projectId = req.params.projectId;
  const apiPath = req.params[pathKey]
  try {
    var mockProject = db.MockProject.findById(projectId);
    if (!mockProject) {
      next(new Error(`mock project id ${projectId} not find`))
      return;
    }
    const mockApis = await db.MockApi.findAll({ where: {
      projectId
    }}) || []
    const api = mockApis.filter(mockApi => pathToRegExp(mockApi.apiPath).test(`/${apiPath}`) && apiMethods[mockApi.apiMethod] == req.method)[0]
    if (!api) {
      next(new error(`mock server api path ${apipath} method ${req.method} in project id ${id} not find`));
      return;
    }
    const { template = "" }  = api;
    var data = Mock.mock(JSON.parse(template))
    res.json(data);
  } catch (e) {
    next(e);
  }
}

module.exports = {
  getMockData
};
