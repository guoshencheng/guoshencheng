
var db = require('../../db/index');

const renderTips = (req, res, next) => {
  db.Tip.findAll().then(docs => {
    res.render('tips', {
      title: 'Express',
      env: req.custom.env,
      tips: docs.map(doc => doc.toJSON()),
      hash: req.custom.resourceHash.hash
    });
  }).catch(next);
}

module.exports = {
  renderTips
};
