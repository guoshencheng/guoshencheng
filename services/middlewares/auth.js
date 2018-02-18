var db = require('../../db')

const checkAuth = (redirect) => async (req, res, next) => {
  redirect = redirect || "/auth/github";
  const session = req.session
  const passport = session.passport || {};
  const user = passport.user;
  if (user && user.userId) {
    try {
      const _user = await db.User.findById(user.userId);
      if (_user) {
        req.custom.authUser = _user;
        next();
      } else {
        res.redirect(redirect);
      }
    } catch (e) {
      next(e)
    }
  } else {
    res.redirect(redirect);
  }
}

module.exports = {
  checkAuth
};
