/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	home: function(req,res){
		if (req.isAuthenticated()) {
			//Find Personal Works
			Works.find({public: false}).exec(function (err, data){
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
					me: req.user,
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

