var db = require('../../db')

var findById = (req, res, next) => {
  const id = req.params.projectId;
  db.MockProject.findById(id).then(doc => {
    if (doc) {
      req.custom.mockProject = doc;
      next();
    } else {
      next(new Error(`mock server id ${id} not find`))
    }
  }).catch(next);
}


module.exports = {
  findById
}
