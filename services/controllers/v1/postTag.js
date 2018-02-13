var db = require('../../../db/index');

const all = async (req, res, next) => {
  try {
    const postTags = await db.PostTag.findAll();
    res.json(postTags.map(doc => doc.toJSON()));
  } catch (e) {
    next(e);
  }
}

const findById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const postTag = await db.PostTag.findById(id);
    res.json(postTag.toJSON());
  } catch (e) {
    next(e)
  }
}

module.exports = {
  all, findById
};
