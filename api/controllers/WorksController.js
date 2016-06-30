/**
 * WorksController
 *
 * @description :: Server-side logic for managing works
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var shortid = require('shortid');
var mkdirp = require('mkdirp');
var fs = require('fs');
var getDirName = require('path').dirname;

function writeFile(path, contents, cb) {
  mkdirp(getDirName(path), function (err) {
    if (err) return cb(err);

    fs.writeFile(path, contents, cb);
  });
}
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
	},
	CreateorUpdate: function(req,res) {

		var base64 = req.body.thumbnail;
		var buf = base64.split(',')[1];
		//Write to somewhere
		writeFile( "/assets/images/user/uploads/" + shortid.generate() + ".png", buf, 'base64', function(err) {
		  if (err) {
		  	return console.log(err);
		  }
		  console.log('file-saved!');
		});
	}
};

