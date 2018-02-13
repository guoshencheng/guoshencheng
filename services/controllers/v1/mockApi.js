var db = require('../../../db/index');

const create = async (req, res, next) => {
  const projectId = req.params.projectId;
  const authUser = req.custom.authUser;
  let body = Object.assign({}, req.body);
  delete body.id;
  const project = db.MockProject.findById(projectId);
  if (project && project.ownerId == authUser.id) {
      const args = Object.assign({}, body, { projectId: project.id });
      const doc = db.MockApi.create(args);
      res.json(doc.toJSON());
  } else {
    next(new Error(`project not exist or it is not your project`))
  }
}

const findById = (req, res, next) => {
  const projectId = req.params.projectId;
  const id = req.params.id;
  const authUser = req.custom.authUser;
  db.MockProject.findById(projectId).then(project => {
    if (project && project.ownerId == authUser.id) {
      return db.MockApi.findById(id);
    } else {
      throw new Error("project not exist or it is not your project");
    }
  }).then(doc => {
    if (doc && doc.projectId == projectId) {
      res.json(doc.toJSON());
    } else {
      throw new Error(`api id ${id} is not exist in project ${projectId}`);
    }
  }).catch(next);
}

const findAll = (req, res, next) => {
  const projectId = req.params.projectId;
  const authUser = req.custom.authUser;
  db.MockProject.findById(projectId).then(project => {
    if (project && project.ownerId == authUser.id) {
      return db.MockApi.findAll({ where: { projectId } });
    } else {
      throw new Error("project not exist or it is not your project");
    }
  }).then(docs => {
    res.json(docs.map(doc => doc.toJSON()))
  }).catch(next);

}

const update = (req, res, next) => {
  const projectId = req.params.projectId;
  const id = req.params.id;
  const authUser = req.custom.authUser;
  const body = req.body;
  db.MockProject.findById(projectId).then(project => {
    if (project && project.ownerId == authUser.id) {
      const args = Object.assign({}, body, { projectId: project.id });
      return db.MockApi.findById(id);
    } else {
      throw new Error("project not exist or it is not your project");
    }
  }).then(doc => {
    if (doc && doc.projectId == projectId) {
      return doc.update(body, { fields: ["apiMethod", "apiPath", "apiDescribe", "template"] })
    } else {
      throw new Error(`api id ${id} is not exist in project ${projectId}`);
    }
  }).then(doc => {
    res.json(doc.toJSON());
  }).catch(next);
}

module.exports = {
  create, findAll, findById, update
};
