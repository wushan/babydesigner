/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

module.exports = {

    _config: {
        actions: false,
        shortcuts: false,
        rest: false
    },
    auth: function(req,res) {
        if (req.isAuthenticated()) {
            authorized = true;
            return res.redirect('/user');
        } else {
            authorized = false;
            return res.view('login', {authorized: authorized});
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
                res.redirect('/');
                // return res.send({
                //     message: info.message,
                //     user: user
                // });
            });

        })(req, res);
    },

    logout: function(req, res) {
        req.logout();
        res.redirect('/');
    }
};
