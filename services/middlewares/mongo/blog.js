var Models = require('../../mongo/index.js');
var BlogModel = Models['blog'];
var Blog = Models['blog'].Model;

var find = (req, res, next) => {
  var id = req.params.id || req.query.id
  var name = req.query.name;
  var query = {};
  if (id) query._id = id;
  if (name) query.name = name;
  Blog.findOne(query).then(blog => {
    res.json(BlogModel.filter(blog));
  }).catch(reason => {
    res.json(reason);
  })
}

var findMany = function(req, res, next) {
  Blog.find().then(blogs => {
    res.json(blogs.map(blog => {
      return BlogModel.filter(blog);
    }));
  }).catch(reason => {
    res.json(reason);
  });
}

var create = function(req, res, next) {
  var body = req.body;
  console.log(body)
  var success = BlogModel.check(body)
  if (!success) {
    next(new Error("body check fail"));
  } else {
    var blog = new Blog(body);
    blog.save().then(result => {
      res.json(BlogModel.filter(result))
    }).catch(reason => {
      res.json(reason);
    })
  }
}

var update = function(req, res, next) {
  var body = req.body;
  var id = req.params.id || req.query.id;
  var success = BlogModel.check(body);
  if (!success) {
    next(new Error("body check fail"));
  } else {
    Blog.findOne({id: id}).then(blog => {
      if (blog) {
        blog = Object.assign(blog, body);
        blog.save().then(result => {
          res.json(BlogModel.filter(result))
        });
      } else {
        next(new Error("blog not exist"))
      }
    }).catch(reason => {
       res.json(reason);
    })
  }
}

module.exports = {
  find, findMany, create, update
}
