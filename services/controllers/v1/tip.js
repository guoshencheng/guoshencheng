
var db = require('../../../db/index');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;
var marked = require('marked');

const create = async (req, res, next) => {
  const tip = req.body;
  tip.tipHtml = marked(tip.tipText)
  try {
    const doc = await db.Tip.create(tip);
    res.json(doc.toJSON());
  } catch (e) {
    next(e)
  }
}

const findById =  async (req, res, next) => {
  const id = req.params.id
  try {
    const doc = await db.Tip.findById(id);
    if (doc) {
      res.json(doc.toJSON())
    } else {
      throw new Error(`id ${id} not find`)
    }
  } catch (e) {
    next(e)
  }
}

const findAll = async (req, res, next) => {
  try {
    const docs = await db.Tip.findAll();
    res.json(docs.map(doc => doc.toJSON()));
  } catch (e) {
    next(e)
  }
}

const search = async (req, res, next) => {
  const s = req.query.search
  try {
    const docs = await db.Tip.findAll({
      where: {
        tipText: {
          [Op.like]: `%${s}%`
        }
      }
    })
    res.json(docs.map(doc => doc.toJSON()));
  } catch (e) {
    next(e)
  }
}

const update = async (req, res, next) => {
  const id = req.params.id;
  const body = Object.assign({}, req.body);
  body.tipHtml = marked(body.tipText)
  try {
    var doc = await db.Tip.findById(id);
    doc = await doc.update(body, { fields: ['tipText', 'tipHtml'] })
    if (doc) {
      res.json(doc.toJSON());
    } else {
      throw new Error(`id ${id} not found`);
    }
  } catch (e) {
    next(e)
  }
}

const deleteById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const doc = await db.Tip.destroy({ where: { id } })
    res.json(doc);
  } catch (e) {
    next(e)
  }
}

module.exports = {
  create, findAll, findById, update, search, deleteById
};
