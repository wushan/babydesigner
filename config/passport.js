var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy,
FacebookStrategy = require('passport-facebook').Strategy,
GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
bcrypt = require('bcrypt');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findOne({ id: id } , function (err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {

    User.findOne({ email: email }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }

      bcrypt.compare(password, user.password, function (err, res) {
          if (!res)
            return done(null, false, {
              message: 'Invalid Password'
            });
          var returnUser = {
            email: user.email,
            createdAt: user.createdAt,
            id: user.id
          };
          return done(null, returnUser, {
            message: 'Logged In Successfully'
          });
        });
    });
  }
));

passport.use(new FacebookStrategy({
    clientID: '263307857379117',
    clientSecret: 'b0389d80cf1466cbbe771f91593972bf',
    callbackURL: "http://localhost:1337/auth/facebook/callback",
    profileFields: ['id', 'emails', 'name']
  },
  function(accessToken, refreshToken, profile, done) {
    
    User.findOrCreate({email: profile.emails[0].value }, function(err, user) {
      if (err) { return done(err); }
      sails.log(user);
      return done(null, user, {
        message: 'Logged In Successfully'
      });
    });
  }
));


passport.use(new GoogleStrategy({
    clientID: '807484066323-fkblho3s7mcln3a1eu7jehnhcd7oaoqv.apps.googleusercontent.com',
    clientSecret: 'Zikl8yTLDKBJQ2UJ4xzGhqTI',
    callbackURL: "http://localhost:1337/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({email: profile.emails[0].value }, function(err, user) {
      if (err) { return done(err); }
      sails.log(user);
      return done(null, user, {
        message: 'Logged In Successfully'
      });
    });
  }
));
