/**
 * WorksController
 *
 * @description :: Server-side logic for managing works
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	public: function(req, res){
		Works.find({public: false}).exec(function (err, data){
		  if (err) {
		    return res.negotiate(err);
		  }
		  // sails.log('Wow, there are %d users named Finn.  Check it out:', usersNamedFinn.length, usersNamedFinn);
		  sails.log('Wow, there are %d users named Finn.  Check it out!');
		  // return res.json(data);
		  return res.view('worksPublic', {publicworks: data});
		});
	}
};

