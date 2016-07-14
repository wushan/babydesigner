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
    loadWork: function(req, res) {
        if (req.isAuthenticated()) {
            var queryID = req.param('workid');
            var authorized = true;
            // Query rule
            // is public -> copy
            // is mine -> load

            //Find If User had permission to edit this work
            Works.findOne({author: req.user.id, workid: queryID}).populate('category').populate('subcategory').exec(function (err, workfound){
                if (err) {
                    return res.negotiate(err);
                }
              
                if ( !workfound ) {
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

                            Works.create({author: req.user.id, data: work.data, workid: newWorkID, worksize: work.worksize, category: work.category, subcategory: work.subcategory }).exec(function createCB(err, created){
                                if (err) {
                                    return res.negotiate(err);
                                }
                                // return res.view('editor', {currentArtboard: created});
                                return res.redirect('/editor/' + newWorkID);
                            });

                        } else {
                            //If requesting a private work, return forbidden
                            sails.log('this is a private work');
                            return res.forbidden();
                        }
                    });
                } else {
                    if (workfound.data.objects.length > 0) {
                        //Load the Work
                        Category.find().populate('sizes').exec(function (err, categorylist) {
                            return res.view('editor', {user: req.user, currentArtboard: workfound, authorized: authorized, categorylist: categorylist});
                        });
                    } else {
                        //Load the Work
                        Category.find().populate('sizes').exec(function (err, categorylist) {
                            sails.log(categorylist);
                            return res.view('editor', {user: req.user, currentArtboard: workfound, authorized: authorized, poppresets: true, categorylist: categorylist});
                        });
                    }
                }
            });

        }
    }
};

