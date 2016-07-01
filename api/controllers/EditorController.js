/**
 * EditorController
 *
 * @description :: Server-side logic for managing editors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var passport = require('passport');
var shortid = require('shortid');
module.exports = {

	_config: {
        actions: false,
        shortcuts: false,
        rest: false
    },
    createWork: function( req, res ) {
        if (req.isAuthenticated()) {
            var newWorkID = shortid.generate();
            //Create New
            Works.create({author: req.user.id, data: '{"objects":[],"background":""}', public: true, workID: newWorkID, workSize: [500,500]}).exec(function createCB(err, created){
                
                // return res.view('editor', {currentArtboard: created});
                return res.redirect('/editor/' + newWorkID);
            });
        }
    },
    getWork: function(req, res) {
        if (req.isAuthenticated()) {
            //Create a blank work with shortID
            // var queryID = req._parsedOriginalUrl.query;
            var queryID = req.param('workid');
            //Find If User had permission to edit this work
            Works.find({author: req.user.id, workID: queryID}).exec(function (err, workfound){
              if (err) {
                return res.negotiate(err);
              }
              sails.log('Search finished');
              
              if ( workfound.length < 1 ) {
                return res.forbidden();
              } else {
                return res.view('editor', {currentArtboard: workfound[0]});
              }
            });
        	
            // return res.view('editor');
        }
    }
};

