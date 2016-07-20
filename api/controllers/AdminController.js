/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
module.exports = {

    _config: {
        actions: false,
        shortcuts: false,
        rest: false
    },
    auth: function(req,res) {
        if (req.isAuthenticated() && req.user.group == 'admin') {
            authorized = true;
            return res.view('backend/index');
        } else {
            authorized = false;
            return res.view('backend/login');
        }
    },
    login: function(req, res) {
        passport.authenticate('local', function(err, user, info) {
            if ((err) || (!user)) {
                return res.send({
                    message: info.message,
                    user: user
                });
            }
            req.logIn(user, function(err) {
                if (err) res.send(err);
                //Redirect to Home
                res.redirect('/backend');
            });

        })(req, res);
    },

    logout: function(req, res) {
        req.logout();
        res.redirect('/');
    },
    getWorkCount: function(req,res) {
        Works.count().exec(function countCB(err, found) {
          if (err) {
            return res.negotiate(err);
          }

          // return found;
        });
    }
};
