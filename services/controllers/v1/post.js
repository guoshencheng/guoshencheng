var db = require('../../../db/index');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

const findByTag = (req, res, next) => {
  const id = req.params.id;
  db.PostTag.findById(id).then(doc => {
    if (doc) {
      return db.PostTagMap.findAll({ where: { postTagId: id } }).then(docs => ({ postTag: doc, postIds: docs.map(d => d.postId) }))
    } else {
      throw new Error(`there is no tag id ${id}`)
    }
  }).then(obj => {
    const { postIds, postTag } = obj;
    return db.Post.findAll({
      where: {
        id: {
          [Op.in]: [postIds]
        }
      },
      attributes: ['id', 'short', 'title', 'status']
    }).then(docs => ({ postTag, posts: docs.map(doc => doc.toJSON()) })).catch(err => {
      throw err;
    })
  }).then(result => {
    res.json(result);
  }).catch(next);
}

module.exports = {
  findByTag
};
