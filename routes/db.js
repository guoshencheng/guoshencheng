var express = require('express');
var router = express.Router();

//defined db models
var Models = require('../services/mongo/index.js');
var Blog = Models['blog'].Model;


var findBlogs = function(req, res, next) {
  Blog.find().then(blogs => {
    res.json(blogs);
  }).catch(reason => {
    res.json(reason);
  });
}

var findBlog = function(req, res, next) {
  var id = req.params.id || req.query.id;
  var name = req.query.name;
  var query = {};
  if (id) query.id = id;
  if (name) query.name = name;
  Blog.findOne(query).then(blog => {
    res.json(blog);
  }).catch(reason => {
    res.json(reason);
  })
}

var saveBlog = function(req, res, next) {
  var body = req.body;
  var id = req.params.id || body.id;
  var create = (data) => {
    var blog = new Blog(data);
    return blog.save();
  }
  if (id) {
    Blog.findOne({id: id}).then(blog => {
      delete blog.id;
      if (blog) {
        blog = Object.assign(blog, body)
        return blog.save();
      } else {
        return create(body);
      }
    }).then(blog => {
      res.json(blog)
    }).catch(reason => {
      res.json(reason);
    });
  } else {
    create(body).then(blog => {
      res.json(blog);
    }).catch(reason => {
      res.json(reason);
    })
  }
}



router.get('/blogs', findBlogs);
router.get('/blog', findBlog);
router.get('/blog/:id', findBlog);
router.post('/blog', saveBlog);
router.post('/blog/:id', saveBlog);

module.exports = router;
