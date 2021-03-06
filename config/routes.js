/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': 'HomeController.getHome',
  //User
  'post /user': 'UserController.createUser',
  'put /user': 'UserController.updateUser',
  'get /user': 'UserController.redirectUser',
  'get /user/:username': 'UserController.getUserHome',

  'get /login': 'AuthController.auth',

  'post /login': 'AuthController.login',
  
  'get /auth/facebook': 'AuthController.facebookAuth',
  'get /auth/facebook/callback': 'AuthController.facebookCallback',
  'get /auth/google': 'AuthController.googleAuth',
  'get /auth/google/callback': 'AuthController.googleCallback',

  '/logout': 'AuthController.logout',

  'get /signup': {
    view: 'signup'
  },

  'get /editor': 'EditorController.createWork',
  'get /editor/:workid': 'EditorController.loadWork',

  //Works
  'put /works': 'WorksController.updateWork',
  
  'get /works': 'WorksController.redirectToPublic',
  'get /works/public': 'WorksController.public',
  'get /works/:workid': 'WorksController.getWorkView',
  'get /works/size/:sizeid': 'WorksController.getWorkbySize',

  //Unsplash api
  'get /unsplash': 'UnsplashController.getImage',

  //Static Pages
  'get /annoucement': {
    view: 'announcement'
  },

  //Backend
  'get /admin': 'AdminController.auth',
  'get /admin/login': 'AdminController.auth',
  'post /admin/login': 'AdminController.login',
  'get /admin/categories': 'AdminController.getCategories',
  'post /admin/categories': 'AdminController.addCategories',
  'post /admin/categories:cateid/subcategory': 'AdminController.addSubcategories',
  'get /admin/dashboard': 'AdminController.getDashboard',
  
  //Cate
  'post /category': 'CategoryController.newCategory',
  'put /category': 'CategoryController.updateCategory',
  'get /category': 'CategoryController.getCategory',
  'get /category/:cateid': 'CategoryController.getSpecificCategory',

  //SubCate
  'post /size': 'SizeController.newSize',
  'put /size': 'SizeController.updateSize',
  'get /size': 'SizeController.getSize'


  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
