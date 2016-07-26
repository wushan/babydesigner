'use strict';

var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    request = require('request');


var verifyHandler = function(req, token, tokenSecret, profile, done) {

  process.nextTick(function() {
    var url = 'https://graph.facebook.com/v2.4/me?access_token=%s&fields=id,name,email,first_name,last_name,gender, picture';
    sails.log(token);
    url = url.replace('%s', token);

    var options = {method: 'GET', url: url, json: true};
    request(options, function (err, response) {
      // sails.log(response.body.picture);
      
      if (err) {
        return done(null, null);
      }

      User.findOne({email: response.body.email, facebookid:response.body.id}).exec(function (err, record) {
          if (err) {
              // res.send(err);
              sails.log(err);
          }
          if (record) {
            sails.log('Record');
            sails.log(record);
            return done(null, record);
            //Update Avatar and token
            User.update({email: response.body.email, facebookid:response.body.id},{avatar:response.body.picture.data.url}).exec(function afterwards(err, updated){
              if (err) {
                // handle error here- e.g. `res.serverError(err);`
                return;
              }
              return done(null, record);
            });
          } else {
            User.create({email: response.body.email, facebookid: response.body.id, password: token, username: response.body.email.split("@")[0], avatar: response.body.picture.url }).exec(function createCB(err, created){
              if (err) {
                sails.log(err);
              }
              sails.log('Created');
              sails.log(created);
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