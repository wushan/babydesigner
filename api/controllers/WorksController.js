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
		Works.find({public: true}).populate('author').exec(function (err, data){
		  if (err) {
		    return res.negotiate(err);
		  }
		  sails.log(data);
		  if (req.isAuthenticated()) {
		  	authorized = true;
		  	return res.view('worksPublic', {user: req.user, publicworks: data, authorized: authorized});
		  } else {
		  	authorized = false;
		  	return res.view('worksPublic', {user: req.user, publicworks: data, authorized: authorized});
		  }
		});
		// Works.find({public: true}).exec(function (err, data){
		//   if (err) {
		//     return res.negotiate(err);
		//   }
		//   sails.log(data);
		//   if (req.isAuthenticated()) {
		//   	authorized = true;
		//   	return res.view('worksPublic', {user: req.user, publicworks: data, authorized: authorized});
		//   } else {
		//   	authorized = false;
		//   	return res.view('worksPublic', {user: req.user, publicworks: data, authorized: authorized});
		//   }
		// });
	},
	redirectToPublic: function(req, res) {
		return res.redirect('/works/public');
	},
	CreateorUpdate: function(req,res) {
		var base64 = req.body.thumbnail;
		var buf = base64.split(',')[1];
		//Write to somewhere
		sails.log(req.body);
		//Update the record and write the thumbnail
		var savePath = "preview/" + req.body.workid + ".png";
		writeFile(".tmp/public/preview/" + req.body.workid + ".png", buf, 'base64', function(err){
		  if(err) {
		    throw err;
		  }
		  sails.log('file writed');
		});

		Works.update({author: req.user.id, workid: req.body.workid },{data: req.body.data, thumbnail: savePath, public: req.body.public}).exec(function afterwards(err, updated){
		  if (err) {
		    // handle error here- e.g. `res.serverError(err);`
		    return res.serverError(err);
		  }
		  return res.send('updated.');
		});
	}
};

