module.exports = function(grunt) {

	grunt.config.set('postcss', {
        options: {
            map:true,
            processors: [
                require('pixrem')(), // add fallbacks for rem units
                require('autoprefixer')(
                    {
                        browsers: ['IE 8', 'last 2 versions']
                    }
                ),
                
                require('cssnano')() // minify the result
            ]
        },
        dist: {
            src: 'assets/styles/*.css'
        }
    });

    grunt.loadNpmTasks('grunt-postcss');
};

// module.exports = function(grunt) {
//     grunt.config.set('postcss', {
// //        dev: {
// //            pkg: grunt.file.readJSON('package.json'),
//            // postcss: {
//                 options: {
//                     map:true,
//                     processors: [
//                         require('pixrem')(), // add fallbacks for rem units
//                         require('autoprefixer')(
//                             {
//                                 browsers: ['IE 8', 'last 2 versions']
//                             }
//                         ),
//                         require('cssgrace'),
//                         require('cssnano')() // minify the result
//                     ]
//                 },
//                 dist: {
//                     src: 'assets/styles/*.css'
//                 }
//            // }
// //       /  }
//     });
//     grunt.loadNpmTasks('grunt-postcss');
// };