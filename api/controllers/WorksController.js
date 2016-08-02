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
var AWS = require('aws-sdk');
AWS.config.loadFromPath('./s3_config.json');
var s3Bucket = new AWS.S3( { params: {Bucket: 'draftty'} });

function writeFile(path, contents, cb) {
  mkdirp(getDirName(path), function (err) {
    if (err) return cb(err);

    fs.writeFile(path, contents, cb);
  });
}

module.exports = {
	public: function(req, res){
		Works.find({ where: { public:true }, sort: 'updatedAt DESC' }).populate('author').populate('subcategory').exec(function (err, data){
		  if (err) {
		    return res.negotiate(err);
		  }
		  sails.log(data);
		  if (req.isAuthenticated()) {
		  	authorized = true;
		  	return res.view('worksPublic', {user: req.user, publicworks: data, authorized: authorized});
		  } else {
		  	authorized = false;
		  	// return res.send({user: req.user, publicworks: data, authorized: authorized});
		  	return res.view('worksPublic', {user: req.user, publicworks: data, authorized: authorized});
		  }
		});
	},
	redirectToPublic: function(req, res) {
		return res.redirect('/works/public');
	},
	updateWork: function(req,res) {
		var base64 = req.body.thumbnail;
		// var buf = base64.split(',')[1];
		sails.log('Work Updated.')
		// // Update the record and write the thumbnail
		// var savePath = "preview/" + req.body.workid + ".png";
		// writeFile(".tmp/public/preview/" + req.body.workid + ".png", buf, 'base64', function(err){
		//   if(err) {
		//     throw err;
		//   }
		//   sails.log('file writed');
		// });
		//Upload this fucker to S3
		var savePath = "https://" + s3Bucket.config.endpoint + "/" + s3Bucket.config.params.Bucket + '/' + req.body.workid;
		var buf = new Buffer(base64.replace(/^data:image\/\w+;base64,/, ""),'base64');
		  var data = {
		    Key: req.body.workid, 
		    Body: buf,
		    ContentEncoding: 'base64',
		    ContentType: 'image/jpeg'
		  };

		  s3Bucket.putObject(data, function(err, data){
		      if (err) { 
		        console.log(err);
		        console.log('Error uploading data: ', data); 
		      } else {
		      	sails.log(s3Bucket);
		        console.log('succesfully uploaded the image!');
		      }
		  });

		Works.update({author: req.user.id, workid: req.body.workid },{data: req.body.data, thumbnail: savePath, public: req.body.public, category: req.body.category, subcategory: req.body.subcategory, workwidth: req.body.workwidth, workheight: req.body.workheight }).exec(function afterwards(err, updated){
		  if (err) {
		    // handle error here- e.g. `res.serverError(err);`
		    return res.serverError(err);
		  }
		  return res.send('updated.');
		});
	},
	getWorkView: function(req,res) {
		var workid = req.param('workid');
        var authorized;
        if (req.isAuthenticated()) {
        	authorized = true;
        } else {
        	authorized = false;
        }
        // check if the request is public
        Works.findOne({workid: workid}).populate('author').exec(function (err, data){
		  if (err) {
		    return res.negotiate(err);
		  }
		  return res.view('showwork', {user: req.user, authorized: authorized, work: data});
		});
	},
	getWorkbySize: function( req, res) {
		var sizeid = req.param('sizeid');
		Works.find({ where: { public:true, subcategory: sizeid }, sort: 'updatedAt DESC' }).exec(function (err, data){
			return res.json(data);
		});
	}
};

//Global
function dataURItoBlob(dataURI) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  var binary = atob(dataURI.split(',')[1]);
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  var array = [];
  for(var i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], {type: mimeString});
}
