var express = require('express');
var router = express.Router();
var controllers = require('../../../../services/controllers')

router.post('/mockProjects', controllers.v1.mockProject.create);
router.put('/mockProjects/:id', controllers.v1.mockProject.update);
router.get('/mockProjects', controllers.v1.mockProject.findAll)
router.get('/mockProjects/:id', controllers.v1.mockProject.findById);

router.post('/mockProjects/:projectId/mockApis', controllers.v1.mockApi.create);
router.put('/mockProjects/:projectId/mockApis/:id', controllers.v1.mockApi.update);
router.get('/mockProjects/:projectId/mockApis', controllers.v1.mockApi.findAll);
router.get('/mockProjects/:projectId/mockApis/:id', controllers.v1.mockApi.findById);

module.exports = router;
