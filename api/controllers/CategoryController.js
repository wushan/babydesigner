/**
 * CategoryController
 *
 * @description :: Server-side logic for managing categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	newCategory: function( req, res ) {
		Category.create({name: req.body.categoryname}).exec(function createCB(err, created){
            if (err) {
                return res.negotiate(err);
            }
            return res.ok();
        });
	},
	updateCategory: function(req, res) {

	},
	getCategory: function(req, res) {
		Category.find().exec(function (err, data){
			return res.json(data);
		});
	},
	getSpecificCategory: function(req,res) {
		var queryID = req.param('cateid');
		Category.findOne({id: queryID}).populate('sizes').exec(function (err, data){
			return res.json(data);
		});
	}
};

