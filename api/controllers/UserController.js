/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	auth: function(req,res){
		if (req.isAuthenticated()) {
			return res.send(req.user);
		} else {
			return res.redirect('/login');
		}
	}
};

