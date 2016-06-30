module.exports = function(grunt) {

	grunt.config.set('postcss', {
        dev: {
            files: [{
                expand: true,
                cwd: '.tmp/public/styles/',
                src: ['importer.css'],
                dest: '.tmp/public/styles/',
                ext: '.css'
            }]
        }
    });

    grunt.loadNpmTasks('grunt-postcss');
};