/**
 * SizeController
 *
 * @description :: Server-side logic for managing sizes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	newSize: function (req,res) {
		sails.log(req.body);
		Size.create({category: req.body.parent ,slug: req.body.subcategoryname, width: req.body.width, height: req.body.height}).exec(function createCB(err, created){
            if (err) {
                return res.negotiate(err);
            }
            return res.ok();
        });
	},
	updateSize: function(req,res) {

	},
	getSize: function(req,res) {

	}
};

