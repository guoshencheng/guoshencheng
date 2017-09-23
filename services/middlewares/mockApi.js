var db = require('../../db')

var findByPath = (req, res, next) => {
  const id = req.params.projectId;
  db.MockApi.findOne({ where: {
    apiPath
  }}).then(doc => {
    if (doc) {
      req.custom.mockProject = doc;
      next();
    } else {
      next(new Error(`mock server id ${id} not find`))
    }
  }).catch(next);
}


module.exports = {
  findByPath
}
