var express = require('express');
var router = express.Router();
var middlwares = require('../../../services/middlewares/index')
var Mock = require('mockjs');

router.use('/:projectId/*', middlwares.mockProject.findById('projectId'), middlwares.mockApi.findByPath('0', 'projectId', false), (req, res, next) => {
  const mockApi = req.custom.mockApi;
  const { template = "" }  = mockApi;
  var data = Mock.mock(JSON.parse(template))
  res.json(data);
})

module.exports = router;
