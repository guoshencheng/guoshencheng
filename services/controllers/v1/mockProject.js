var db = require('../../../db/index');

const update = (req, res, next) => {
  const id = req.params.id;
  const authUser = req.custom.authUser;
  const body = req.body;
  db.MockProject.findById(id).then(doc => {
    if (doc && doc.ownerId === authUser.id) {
      return doc;
    } else {
      throw new Error("project not exist or it is not your project");
    }
  }).then(doc => {
    return doc.update(body, { fields: ['projectName', 'projectDescribe', 'basePath'] })
  }).then(doc => {
    res.json(doc);
  }).catch(next);
}

const create = (req, res, next) => {
  const body = req.body;
  const authUser = req.custom.authUser;
  const args = Object.assign({}, body, { ownerId: authUser.id })
  db.MockProject.create(args).then(doc => {
    res.json(doc);
  }).catch(next);
}

const findAll = (req, res, next) => {
  const authUser = req.custom.authUser;
  db.MockProject.findAll({ where: { ownerId: authUser.id } }).then(docs => {
    res.json(docs.map(doc => doc.toJSON()));
  }).catch(next);
}

const findById = (req, res, next) => {
  const authUser = req.custom.authUser;
  const id = req.params.id;
  db.MockProject.findById(id).then(doc => {
    if (doc) {
      if (doc.ownerId == authUser.id) {
        res.json(doc.toJSON());
      } else {
        throw new Error(`It's not your project`)
      }
    } else {
      throw new Error(`Project ${id} is not exist`)
    }
  }).catch(next);
}

module.exports = {
  create, findAll, findById, update
};
