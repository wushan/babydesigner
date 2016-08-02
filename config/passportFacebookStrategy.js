'use strict';

var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    request = require('request');

var AWS = require('aws-sdk');
AWS.config.loadFromPath('./s3_config.json');
var s3Bucket = new AWS.S3( { params: {Bucket: 'draftty'} });
var https = require('https');

var verifyHandler = function(req, token, tokenSecret, profile, done) {

  process.nextTick(function() {
    var url = 'https://graph.facebook.com/v2.4/me?access_token=%s&fields=id,name,email,first_name,last_name,gender, picture.width(500).height(500)';
    sails.log(token);
    url = url.replace('%s', token);

    var options = {method: 'GET', url: url, json: true};
    request(options, function (err, response) {

      // sails.log(response.body.picture);
      
      if (err) {
        return done(null, null);
      }
      // sails.log(response.body.id);
      //Request avatar file and send to S3
      
      https.get(response.body.picture.data.url, function onResponse(res) {
        if (res.statusCode >= 300) {
              return callback(new Error('error ' + res.statusCode + ' retrieving ' + url));
        }
        
        s3Bucket.upload({
          Key: 'avatar-' + response.body.id,
          Body: res,
          ContentType: 'image/jpeg'
        },function(err,done){
            if (err) {
              sails.log(err);
            }
            sails.log('done');
        })
      })
      .on('error', function onError(err) {
          return callback(err);
      });
      var savePath = "https://" + s3Bucket.config.endpoint + "/" + s3Bucket.config.params.Bucket + '/avatar-' + response.body.id;

      User.findOne({email: response.body.email, facebookid:response.body.id}).exec(function (err, record) {
          if (err) {
              // res.send(err);
              sails.log(err);
          }
          if (record) {
            //Update Avatar and token
            User.update({email: response.body.email, facebookid:response.body.id},{avatar: savePath}).exec(function afterwards(err, updated){
              if (err) {
                // handle error here- e.g. `res.serverError(err);`
                return;
              }
              done(null, updated[0]);
            });
          } else {
            User.create({email: response.body.email, facebookid: response.body.id, password: token, username: response.body.email.split("@")[0], avatar: savePath }).exec(function createCB(err, created){
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