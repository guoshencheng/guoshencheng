var db = require('../../db/index');
var moment = require('moment');
var Sequelize = require('sequelize');
var marked = require('marked');
const Op = Sequelize.Op;


var author = {
  name: "Century Guo",
  email: "guoshencheng1@gmail.com"
}

const renderPostPageById = async (req, res, next) => {
  const id = req.params.id;
  const { resourceHash, env } = req.custom;
  try {
    var post = await db.Post.findById(id);
    post = post.toJSON();
    const { markdown = "" } = post;
    const html = marked(markdown);
    post.created = moment(post.created_at).format('MMM.DD YYYY');
    res.render('posts/post', {
      author,
      env: env,
      hash: resourceHash.hash,
      html,
      post
    });
  } catch (e) {
    next(e)
  }
}

const renderPostList = async (req, res, next) => {
  const { resourceHash, env } = req.custom;
  try {
    var posts = await db.Post.findAll({
      where: {
        status: 1
      },
      order: [["created_at", "DESC"]]
    });
    posts = posts.map(post => post.toJSON()).map(post => Object.assign({}, post, {
      created: moment(post.created_at).format('MMM.DD YYYY')
    }))
    res.render('posts/index', {
      author,
      env: env,
      hash: resourceHash.hash,
      posts
    });
  } catch (e) {
    next(e)
  }
}

module.exports = {
  renderPostPageById, renderPostList
};
