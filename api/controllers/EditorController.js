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
            //Find Work via queryID
            Works.findOne({workid: queryID}).populate('category').populate('subcategory').exec(function (err, work){
                if (err) {
                    return negotiate(err);
                }
                sails.log('作品存在');
                if (work.author !== req.user.id) {
                    sails.log('作品不屬於請求者');
                    if (work.public) {
                        sails.log('公開作品');
                        sails.log('建立新紀錄，重新導向');
                        var newWorkID = shortid.generate();
                        sails.log('新作品ID:' + newWorkID);
                        Works.create({author: req.user.id, data: work.data, workid: newWorkID, workwidth: work.workwidth, workheight: work.workheight, category: work.category, subcategory: work.subcategory }).exec(function createCB(err, created){
                            if (err) {
                                return res.negotiate(err);
                            }
                            // return res.view('editor', {currentArtboard: created});
                            return res.redirect('/editor/' + newWorkID);
                        });

                    } else {
                        sails.log('不公開作品');
                        return res.forbidden();
                    }
                } else {
                    sails.log('作品(屬於)請求者');
                    if (work.category) {
                        return res.view('editor', {user: req.user, currentArtboard: work, authorized: authorized, poppresets: false});
                    } else {
                        return res.view('editor', {user: req.user, currentArtboard: work, authorized: authorized, poppresets: true});
                    }
                }
            });
        }
    }
};

