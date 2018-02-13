
var db = require('../../db/index');

const renderTips = async (req, res, next) => {
  try {
    const docs = await db.Tip.findAll();
    res.render('tips', {
      title: 'Express',
      env: req.custom.env,
      tips: docs.map(doc => doc.toJSON()),
      hash: req.custom.resourceHash.hash
    });
  } catch (e) {
    next(e)
  }
}

module.exports = {
  renderTips
};
