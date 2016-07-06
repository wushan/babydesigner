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
		var username = req.param('username');
		var authorized;
		sails.log(req.user.username);

		if (username === req.user.username) {
			//Requesting yourself
			if (req.isAuthenticated()) {
				authorized = true;
				Works.find({ author: req.user.id }).populate('author').exec(function (err, data){
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
			if (req.isAuthenticated()) {
				authorized = true;
				sails.log('requesting others');
				User.findOne({ username: username }).populate('works', { where: { public: true }}).exec(function( err, data ){
					if (err) {
						return res.negotiate(err);
					}
					//When requesting others, only public works shows up
					// var publicworks = data.works;
					// sails.log(typeof publicworks);
					return res.view('memberPublic', {
						authorized: authorized,
						user: req.user,
						works: data //Return all works belongs to the user.
					});
				});
				// Works.find({ author: req.user.id }).populate('author').exec(function (err, data){
				// 	if (err) {
				// 		return res.view('memberHome', {
				// 			error: err
				// 		});
				// 	}
				// 	return res.view('memberHome', {
				// 		authorized: authorized,
				// 		user: req.user,
				// 		works: data //Return all works belongs to the user.
				// 	});
				// });
			}
		}
		// if (req.isAuthenticated()) {
		// 	authorized = true;
		// 	//Find Personal Works
		// 	Works.find({ author: req.user.id }).populate('author').exec(function (err, data){
		// 		if (err) {
		// 		    // return res.negotiate(err);
		// 		    return res.view('memberHome', {
		// 				error: err
		// 			});
		// 		}
				
		// 		sails.log(data);
		// 		return res.view('memberHome', {
		// 			authorized: authorized,
		// 			user: req.user,
		// 			privateworks: data
		// 		});
		// 	  // return res.view('worksPublic', {publicworks: data});
		// 	});
		// 	// return res.send(req.user);
		// } else {
		// 	return res.redirect('/login');
		// }
	}
};

