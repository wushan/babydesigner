'use strict';

var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    request = require('request');


var verifyHandler = function(req, token, tokenSecret, profile, done) {

  process.nextTick(function() {
    var url = 'https://graph.facebook.com/v2.4/me?access_token=%s&fields=id,name,email,first_name,last_name,gender';
    url = url.replace('%s', token);

    var options = {method: 'GET', url: url, json: true};
    request(options, function (err, response) {
      sails.log(response);
      if (err) {
        return done(null, null);
      }

      User.findOne({email: response.body.email, facebookid:response.body.id}).exec(function (err, record) {
          if (err) {
              res.send(err);
          }
          if (record) {
            return done(null, record);
          } else {
            User.create({email: response.body.email, facebookid: response.body.id, password: token, username: response.body.email.split("@")[0]}).exec(function createCB(err, created){
              return done(null, created);
            });
          }
      });
    });
  });
};

passport.use(new FacebookStrategy({
  clientID: '263307857379117',
  clientSecret: 'b0389d80cf1466cbbe771f91593972bf',
  callbackURL: 'http://localhost:1337/auth/facebook/callback',
  passReqToCallback: true
}, verifyHandler));