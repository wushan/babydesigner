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

		User.create(userData).exec(function createCB(err, created){
			if (err) {
				sails.log(err);
				return res.badRequest(err);
			}
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
	                res.ok();
	                // return res.send({
	                //     message: info.message,
	                //     user: user
	                // });
	            });

	        })(req, res);
        });
	},
	updateUser: function(req,res) {
		sails.log(req.file());
	},
	getUserHome: function(req,res){
		var username = req.param('username');
		var authorized;
		if (req.user) {
			if (username === req.user.username) {
				//Requesting yourself
				if (req.isAuthenticated()) {
					authorized = true;
					Works.find({ where: { author: req.user.id }, sort: 'updatedAt DESC' }).populate('author').exec(function (err, data){
						if (err) {
							return res.view('memberHome', {
								error: err
							});
						}
						return res.view('memberPrivate', {
							authorized: authorized,
							user: req.user,
							works: data //Return all works belongs to the user.
						});
					});
				}
			} else {
				//Requesting others profile
				User.findOne({ username: username }).populate('works', { where: { public: true }}).exec(function( err, data ){
					if (err) {
						return res.negotiate(err);
					}
					//When requesting others, only public works shows up
					if (req.isAuthenticated()) {
						authorized = true;
						sails.log('requesting others');
					} else {
						authorized = false;
					}
					return res.view('memberPublic', {
						authorized: authorized,
						user: req.user,
						works: data //Return all works belongs to the user.
					});
				});
			}
		} else {
			User.findOne({ username: username }).populate('works', { where: { public: true }}).exec(function( err, data ){
				if (err) {
					return res.negotiate(err);
				}
				//When requesting others, only public works shows up
				if (req.isAuthenticated()) {
					authorized = true;
					sails.log('requesting others');
				} else {
					authorized = false;
				}
				sails.log(data);
				return res.view('memberPublic', {
					authorized: authorized,
					user: data,
					works: data.works //Return all works belongs to the user.
				});
			});
		}
		
	}
};

