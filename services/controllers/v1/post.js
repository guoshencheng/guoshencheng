var db = require('../../../db/index');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

const findByTag = async (req, res, next) => {
  const id = req.params.id;
  try {
    var postTag = await db.PostTag.findById(id);
    var postTagMaps = await db.PostTagMap.findAll({ where: { postTagId: id } });
    var postIds = postTagMaps.map(postTagMap => postTagMap.postId);
    var posts  = await db.Post.findAll({
      where: {
        id: {
          [Op.in]: [postIds]
        }
      },
      attributes: ['id', 'short', 'title', 'status']
    })
    const result = {
      postTag, posts: posts.map(post => post.toJSON())
    }
    res.json(result);
  } catch (e) {
    next(e);
  }
}

module.exports = {
  findByTag
};
