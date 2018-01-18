var db = require('../../../db/index');

const all = (req, res, next) => {
  db.PostTag.findAll().then(docs => {
    res.json(docs.map(doc => doc.toJSON()));
  }).catch(next);
}
const findById = (req, res, next) => {
  const id = req.params.id;
  db.PostTag.findById(id).then(doc => {
    if (doc) {
      res.json(doc.toJSON());
    } else {
      next(new Error(`post tag id ${id} is not found`))
    }
  }).catch(next);
}

module.exports = {
  all, findById
};
