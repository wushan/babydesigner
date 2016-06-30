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
    editor: function(req, res) {
        if (req.isAuthenticated()) {
            //Create a blank work with shortID
            var queryID = req._parsedOriginalUrl.query;
            console.log(queryID);
            if (queryID === null) {
                //Create New
                Works.create({author: req.user.id, data: {"objects":[],"background":""}, public: false, workID: shortid.generate()}).exec(function createCB(err, created){
                    sails.log('create new work');
                    sails.log(created);
                    return res.view('editor', {currentArtboard: created});
                });

                
            } else {
                sails.log(queryID);
                sails.log(req.user);
                //Find If User had permission to edit this work
                Works.find({author: req.user.id, workID: queryID}).exec(function (err, workfound){
                  if (err) {
                    return res.negotiate(err);
                  }
                  sails.log('record found !');
                  
                  if ( workfound.length < 1 ) {
                    return res.forbidden();
                  } else {
                    return res.view('editor', {currentArtboard: workfound[0]});
                  }
                });
            }
        	
            // return res.view('editor');
        }
    }
};

