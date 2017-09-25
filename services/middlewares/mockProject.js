var db = require('../../db')

var findById = (key, isEnd) => (req, res, next) => {
  const id = req.params[key];
  db.MockProject.findById(id).then(doc => {
    if (doc) {
      if (isEnd) {
        res.json(doc.toJSON());
      } else {
        req.custom.mockProject = doc;
        next();
      }
    } else {
      next(new Error(`mock server id ${id} not find`))
    }
  }).catch(next);
}


module.exports = {
  findById
}
