var express = require('express');
var router = express.Router();
var middlwares = require('../../../services/middlewares/index')

router.use('/:projectId/*', middlwares.mockProject.findById, (req, res, next) => {
  res.json(req.custom.mockProject)
})

module.exports = router;
