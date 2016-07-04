/**
 * EditorController
 *
 * @description :: Server-side logic for managing editors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var passport = require('passport');
var shortid = require('shortid');
module.exports = {
    createWork: function( req, res ) {
        if (req.isAuthenticated()) {
            var newWorkID = shortid.generate();
            //Create New
            Works.create({author: req.user.id, data: '{"objects":[],"background":""}', workid: newWorkID}).exec(function createCB(err, created){
                if (err) {
                    return res.negotiate(err);
                }
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
            
            // Query rule
            // is public -> copy
            // is mine -> load


            //Find If User had permission to edit this work
            Works.find({author: req.user.id, workid: queryID}).exec(function (err, workfound){
              if (err) {
                return res.negotiate(err);
              }
              
              
              if ( workfound.length < 1 ) {
                sails.log('This work is not belongs to the requester.')
                //Find if it is public
                Works.findOne({workid: queryID}).exec(function (err, work){
                    if (err) {
                        return res.negotiate(err);
                    }
                    sails.log(work.public);
                    if (work.public == true) {
                        //If this is public work, load it
                        sails.log('this is a public work');
                        //Create A new Work, load the data from request.
                        var newWorkID = shortid.generate();

                        Works.create({author: req.user.id, data: work.data, workid: newWorkID, worksize: work.worksize}).exec(function createCB(err, created){
                            if (err) {
                                return res.negotiate(err);
                            }
                            // return res.view('editor', {currentArtboard: created});
                            return res.redirect('/editor/' + newWorkID);
                        });

                    } else {
                        sails.log('this is a private work');
                        return res.forbidden();
                    }
                });
                // return res.forbidden();
              } else {
                return res.view('editor', {user: req.user, currentArtboard: workfound[0]});
              }
            });
        	
            // return res.view('editor');
        }
    }
};

