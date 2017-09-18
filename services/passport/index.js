var config = require('config')
var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;
var db = require('../../db/index');

const AUTH_TYPES = {
  GITHUB: 0
}

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
passport.use(new GitHubStrategy({
    clientID: config.oauth.github.CLIENT_ID,
    clientSecret: config.oauth.github.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/github/callback"
  }, (accessToken, refreshToken, profile, done) => {
    profile = profile._json;
    db.OAuth.findOne({ where: { authId: profile.id } }).then(doc => {
      return doc ? doc : db.OAuth.create({ authId: profile.id, authType: AUTH_TYPES.GITHUB, accessToken: accessToken })
    }).then(doc => {
      const createUser = () => {
        return db.User.create({ nickname: profile.login, email: profile.email, avatar: profile.avatar_url }).then(updateUser)
      }
      const updateUser = (user) => {
        doc.userId = user.id;
        return doc.save().then(d => {
          return { userId: user.id }
        })
      }
      if (doc.userId) {
        return db.User.findById(doc.userId).then(user => {
          if (user) {
            return updateUser(user)
          } else {
            return createUser();
          }
        })
      } else {
        return createUser();
      }
    }).then(user => {
      done(null, user);
    }).catch(error => {
      done(error, null)
    })
  }
));

module.exports = passport;
