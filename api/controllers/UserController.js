/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var passport = require('passport');
module.exports = {
	redirectUser: function(req,res) {
		if (req.isAuthenticated()) {
			sails.log(req.user);
			return res.redirect('/user/'+req.user.username);
		} else {
			return res.redirect('/login');
		}
	},
	createUser: function(req,res) {
		var userData = req.body;

		//Use Email Account name as a Default username
		userData.username = req.body.email.split("@")[0];

		User.create(userData).exec(function createCB(err, created){
            //Automatic Login After Registered
            passport.authenticate('local', function(err, user, info) {
	            sails.log(user);
	            if ((err) || (!user)) {
	                return res.send({
	                    message: info.message,
	                    user: user
	                });
	            }
	            req.logIn(user, function(err) {
	                if (err) res.send(err);
	                //Redirect to Home
	                return res.redirect('/');
	                // return res.send({
	                //     message: info.message,
	                //     user: user
	                // });
	            });

	        })(req, res);
        });
	},
	getUserHome: function(req,res){
		if (req.isAuthenticated()) {
			//Find Personal Works
			Works.find({author: req.user.id }).exec(function (err, data){
				if (err) {
				    // return res.negotiate(err);
				    return res.view('memberHome', {
						error: err
					});
				}
				// sails.log('Wow, there are %d users named Finn.  Check it out:', usersNamedFinn.length, usersNamedFinn);
				// sails.log('Wow, there are %d users named Finn.  Check it out!');
				// return res.json(data);
				return res.view('memberHome', {
					user: req.user,
					privateworks: data
				});
			  // return res.view('worksPublic', {publicworks: data});
			});
			// return res.send(req.user);
		} else {
			return res.redirect('/login');
		}
	}
};

