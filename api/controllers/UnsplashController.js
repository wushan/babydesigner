/**
 * UnsplashController
 *
 * @description :: Server-side logic for managing categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
global.fetch = require('node-fetch');
fetch.Promise = require('bluebird');
var Unsplash = require('unsplash-js');

// var unsplash = new Unsplash.default({
//   applicationId: "6eeba4bff60254559f4ff22d61dcc302f368839db9ed273113186aaf0e10e2f0",
//   secret: "26de0f04f3dcbb3659659dbdd45b6a2bb22cc3acd18be71fb450fbc903b3e374",
//   callbackUrl: "http://draftty.com/auth/unsplash/callback"
// });
// unsplash.toJson = Unsplash.toJson;

module.exports = {
	getImage: function(req,res) {
		sails.log(Unsplash.default);
		sails.log(Unsplash.toJson);

		// unsplash.photos.listPhotos(2, 15, "latest")
		// 	.then(toJson)
		// 	.then(json => {
		// 		sails.log(json);
		// 	});
	}
};

