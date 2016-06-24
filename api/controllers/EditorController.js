/**
 * EditorController
 *
 * @description :: Server-side logic for managing editors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var passport = require('passport');

module.exports = {

	_config: {
        actions: false,
        shortcuts: false,
        rest: false
    },
    login: function(req, res) {
        if (req.isAuthenticated()) {
        	return res.view('editor');
        }
    }
};

