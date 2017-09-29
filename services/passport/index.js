var config = require('config')
var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;
var db = require('../../db/index');

const AUTH_TYPES = {
  GITHUB: 0,
  GITHUB_MOCK_SERVER: 1,
}

const updateUser = (oauth, user) => {
  oauth.userId = user.id;
  return oauth.save().then(d => {
    return { userId: user.id }
  })
}

const createUser = (oauth, profile) => {
  return db.User.create({ nickname: profile.login, email: profile.email, avatar: profile.avatar_url }).then(updateUser.bind({}, oauth))
}

const handleGitHubStrategyCallBack = (authType) => (accessToken, refreshToken, profile, done) => {
  profile = profile._json;
  db.OAuth.findOne({ where: { authId: profile.id } }).then(doc => {
    return doc && doc.authType == authType ? doc : db.OAuth.create({ authId: profile.id, authType, accessToken: accessToken, userId: doc.userId })
  }).then(doc => {
    if (doc.userId) {
      return db.User.findById(doc.userId).then(user => {
        return !!user ? updateUser(doc, user) : createUser(doc, profile)
      })
    } else {
      return createUser(doc, profile);
    }
  }).then(user => done(null, user)).catch(done)
}

const GitHubStrategyFactory = (clientID, clientSecret, callbackURL, authType, name) => {
 const strategy =  new GitHubStrategy({
    clientID, clientSecret, callbackURL
  }, handleGitHubStrategyCallBack(authType))
  if (!!name) {
    strategy.name = name;
  }
  return strategy;
}

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

const guoshencheng = GitHubStrategyFactory(
  config.oauth.github.CLIENT_ID,
  config.oauth.github.CLIENT_SECRET,
  config.oauth.github.callbackURL,
  AUTH_TYPES.GITHUB
);
const mockServer = GitHubStrategyFactory(
  config.oauth.mockServer.github.CLIENT_ID,
  config.oauth.mockServer.github.CLIENT_SECRET,
  config.oauth.mockServer.github.callbackURL,
  AUTH_TYPES.GITHUB_MOCK_SERVER,
  'github_mock_server'
);

passport.use(guoshencheng);
passport.use(mockServer);

module.exports = passport;
