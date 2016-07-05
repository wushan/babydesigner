module.exports = function(grunt) {

	grunt.config.set('postcss', {
        options: {
            map:true,
            processors: [
                require('pixrem')(), // add fallbacks for rem units
                require('autoprefixer')(
                    {
                        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']
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

