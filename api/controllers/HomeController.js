/**
 * HomeController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getHome: function(req,res) {
		var authorized;
		if (req.isAuthenticated()) {
			//If Logged In
			authorized = true;
			return res.view('homepage', {authorized: authorized});
		} else {
			//If Not Logged In
			authorized = false;
			return res.view('homepage', {authorized: authorized});
		}
	}
};

