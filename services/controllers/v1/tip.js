
var db = require('../../../db/index');

const create = (req, res, next) => {
  const tip = req.body;
  db.Tip.create(tip).then(doc => {
    res.json(doc.toJSON());
  }).catch(next)
}

const findById = (req, res, next) => {
  const id = req.params.id
  db.Tip.findById(id).then(doc => {
    if (doc) {
      res.json(doc.toJSON())
    } else {
      throw new Error(`id ${id} not find`)
    }
  }).catch(next)
}

const findAll = (req, res, next) => {
  db.Tip.findAll().then(docs => {
    res.json(docs.map(doc => doc.toJSON()));
  }).catch(next);
}

const search = (req, res, next) => {
  const s = req.query.search
  db.Tip.findAll({ where: {
    tipText: {
      $like: `%${s}%`
    }
  }}).then(docs => {
    res.json(docs.map(doc => doc.toJSON()));
  }).catch(next);
}

const update = (req, res, next) => {
  const id = req.params.id;
  const body = Object.assign({}, req.body);
  db.Tip.findById(id).then(doc => {
    if (doc) {
      return doc.update(body, { fields: ['tipText']});
    } else {
      throw new Error(`id ${id} not found`);
    }
  }).then(doc => {
    res.josn(doc.toJSON());
  }).catch(next);
}

module.exports = {
  create, findAll, findById, update, search
};
