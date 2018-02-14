var db = require('../../../db/index');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

const allOnline =  async (req, res, next) => {
  try {
    const posts = await db.Post.findAll({
      where: {
        status: 1
      },
      order: [["created_at", "DESC"]]
    });
    res.json(posts.map(p => p.toJSON()));
  } catch (e) {
    next(e)
  }
}

const findById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const post = await db.Post.findById(id);
    res.json(post.toJSON());
  } catch (e) {
    next(e)
  }
}

const all = async (req, res, next) => {
  try {
   const posts = await db.Post.all({ order: [["updated_at", "DESC"]]})
   res.json(posts.map(post => post.toJSON()))
  } catch (e) {
    next(e)
  }
}

const createEmpty = async (req, res, next) => {
  try {
    const post = await db.Post.create();
    res.json(post.toJSON());
  } catch (e) {
    next(e)
  }
}

const changeStatus = async (req, res, next) => {
  const id = req.params.id;
  const state = req.params.status;
  try {
    var post = await db.Post.findById(id);
    if (!post) {
      throw new Error(`update post id: ${id} failed`)
      return;
    }
    post.status = status;
    post = await post.save();
    res.json(post.toJSON());
  } catch (e) {
    next(e)
  }
}

const update = async (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  const { markdown, html, title, short, status } = body;
  try {
    let post = await db.Post.findById(id)
    post.markdown = markdown;
    post.html = html;
    post.title = title;
    post.short = short;
    post.status = status;
    post = await post.save();
    res.json(post.toJSON());
  } catch (e) {
    next(e)
  }
}

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
  findByTag, all, createEmpty, update, findById, changeStatus, allOnline
};
