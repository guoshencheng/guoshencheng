var db = require('../../db')

const all = (isEnd) => (req, res, next) => {
  db.Blog.all().then(docs => {
    if (isEnd) {
      res.json(docs);
    } else {
      req.custom.blogs = docs;
      next();
    }
  }).catch(next);
}

const createEmpty = (isEnd) => (req, res, next) => {
  db.Blog.create().save().then(doc => {
    if (isEnd) {
      res.json(doc)
    } else {
      req.custom.blog = doc;
      next();
    }
  }).catch(next);
}

const update = (isEnd, key) => (req, res, next) => {
  const id = req.params[key];
  const body = req.body;
  const { markdown, html, title } = body;
  db.Blog.findById(id).then(doc => {
    if (doc) {
      doc.markdown = markdown;
      doc.html = html;
      doc.title = title;
      return doc.save();
    } else {
      throw `update blog id: ${id} failed`;
    }
  }).catch(next).then(doc => {
    if (isEnd) {
      res.json(doc);
    } else {
      req.blog = doc;
      next();
    }
  });
}

module.exports = {
  all, createEmpty, update
}
