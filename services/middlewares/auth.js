var db = require('../../db')

const checkAuth = (req, res, next) => {
  const session = req.session
  const passport = session.passport || {};
  const user = passport.user;
  if (user && user.userId) {
    db.User.findById(user.userId).then(user => {
      if (user) {
        req.custom.authUser = user;
        next();
      } else {
        res.redirect('/auth/github');
      }
    }).catch(next);
  } else {
    res.redirect('/auth/github');
  }
}

module.exports = {
  checkAuth
};
