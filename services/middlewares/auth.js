var db = require('../../db')

const checkAuth = (redirect) => (req, res, next) => {
  redirect = redirect || "/auth/github";
  const session = req.session
  const passport = session.passport || {};
  const user = passport.user;
  if (user && user.userId) {
    db.User.findById(user.userId).then(user => {
      if (user) {
        req.custom.authUser = user;
        next();
      } else {
        res.redirect(redirect);
      }
    }).catch(next);
  } else {
    res.redirect(redirect);
  }
}

module.exports = {
  checkAuth
};
