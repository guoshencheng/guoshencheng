
var db = require('../../../db/index');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;
var marked = require('marked');

const create = (req, res, next) => {
  const tip = req.body;
  tip.tipHtml = marked(tip.tipText)
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
      [Op.like]: `%${s}%`
    }
  }}).then(docs => {
    res.json(docs.map(doc => doc.toJSON()));
  }).catch(next);
}

const update = (req, res, next) => {
  const id = req.params.id;
  const body = Object.assign({}, req.body);
  body.tipHtml = marked(body.tipText)
  db.Tip.findById(id).then(doc => {
    if (doc) {
      return doc.update(body, { fields: ['tipText', 'tipHtml']});
    } else {
      throw new Error(`id ${id} not found`);
    }
  }).then(doc => {
    res.json(doc.toJSON());
  }).catch(next);
}

const deleteById = (req, res, next) => {
  const id = req.params.id;
  db.Tip.destroy({ where: { id } }).then(doc => {
    res.json(doc);
  }).catch(next);
}

module.exports = {
  create, findAll, findById, update, search, deleteById
};
