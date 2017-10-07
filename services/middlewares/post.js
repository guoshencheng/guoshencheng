var db = require('../../db')

const allOnline = (isEnd) => (req, res, next) => {
  db.Post.findAll({
    where: {
      status: 1
    },
    order: [["created_at", "DESC"]]
  }).then(docs => {
    if (isEnd) {
      res.json(docs);
    } else {
      req.custom.posts = docs;
      next();
    }
  }).catch(next);
}

const findById = (isEnd, key) => (req, res, next) => {
  const id = req.params[key || 'id'];
  db.Post.findById(id).then(doc => {
    if (isEnd) {
      res.json(doc);
    } else {
      req.custom.post = doc;
      next()
    }
  }).catch(next);
}

const all = (isEnd) => (req, res, next) => {
  db.Post.all({ order: [["updated_at", "DESC"]]}).then(docs => {
    if (isEnd) {
      res.json(docs);
    } else {
      req.custom.posts = docs;
      next();
    }
  }).catch(next);
}

const createEmpty = (isEnd) => (req, res, next) => {
  db.Post.create().then(doc => {
    if (isEnd) {
      res.json(doc)
    } else {
      req.custom.post = doc;
      next();
    }
  }).catch(next);
}

const changeStatus = (isEnd, idKey, statusKey) => (req, res, next) => {
  id = req.params[idKey]
  status = req.params[statusKey];
  console.log(id, status);
  db.Post.findById(id).then(doc => {
    if (doc) {
      doc.status = status;
      return doc.save()
    } else {
      throw `update blog id: ${id} failed`;
    }
  }).catch(next).then(doc => {
    if (doc) {
      if (isEnd) {
        res.json(doc);
      } else {
        req.blog = doc;
        next();
      }
    }
  })
}

const update = (isEnd, key) => (req, res, next) => {
  const id = req.params[key];
  const body = req.body;
  const { markdown, html, title, short, status } = body;
  db.Post.findById(id).then(doc => {
    if (doc) {
      doc.markdown = markdown;
      doc.html = html;
      doc.title = title;
      doc.short = short;
      doc.status = status;
      return doc.save();
    } else {
      throw `update blog id: ${id} failed`;
    }
  }).catch(next).then(doc => {
    if (doc) {
      if (isEnd) {
        res.json(doc);
      } else {
        req.blog = doc;
        next();
      }
    }
  });
}

module.exports = {
  all, createEmpty, update, findById, changeStatus, allOnline
}
