/**
 * UserController.js 
 * 
 * @module      :: Controller
 * @description :: Provides the base user
 *                 actions used to make waterlock work.
 *                 
 * @docs        :: http://waterlock.ninja/documentation
 */

module.exports = require('waterlock').actions.user({
  /* e.g.
    action: function(req, res){
  
    }
  */
  register: function ( req, res ) {
  	User.findOrCreate({ email: req.query.email }, { email: req.query.email }).exec(function createFindCB(error, createdOrFoundRecords){
	  console.log(createdOrFoundRecords);
	});

  	return res.send('catch');
  },
  me: function ( req, res ) {
  	//GET ID
  	res.redirect('./tony');
  },
  list: function ( req, res ) {
  	User.find().exec(function afterFind(err, users) {
	  if (err) {
	    // uh oh
	    // (handle error; e.g. `return res.negotiate()`)
	    return;
	  }
	  return res.send(users);
	  // would you look at all those zookeepers?
	  // (now let's do the next thing;
	  //  e.g. `_.reduce(zookeepers, ...)` and/or `return res.json(zookeepers)`)
	});
  }
});