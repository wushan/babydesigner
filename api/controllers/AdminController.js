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
            return res.redirect('/admin/dashboard');
        } else {
            authorized = false;
            return res.view('admin/login', {authorized:authorized});
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
                res.redirect('/admin/dashboard');
            });

        })(req, res);
    },

    logout: function(req, res) {
        req.logout();
        res.redirect('/');
    },
    getDashboard: function (req,res) {
        Works.count().exec(function countCB(err, found) {
          if (err) {
            return res.negotiate(err);
          }
          Works.count({public:true}).exec(function countCB(err, publicfound) {
              return res.view('admin/index', {worksCount: found, worksPublicCount: publicfound});
          });
          // return found;
        });
    },
    getCategories: function( req, res ) {
        Category.find().populate('sizes').exec(function (err, data){
            sails.log(data);
            return res.view('admin/categories', {categories: data});
        });
    },
    addCategories: function( req, res ) {
        
    },
    addSubcategories: function( req, res ) {
        
    }
};
