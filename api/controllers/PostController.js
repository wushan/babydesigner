/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	restricted: function(req,res) {
		return res.send("已登入");
	},
	open: function(req,res) {
		return res.send("公開API");
	}
};

