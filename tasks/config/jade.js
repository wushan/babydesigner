module.exports = function(grunt) {
    grunt.config.set('jade', {
        dev: {
          options: {
              pretty: true,
              namespace: 'Templates'  
          },
          files: [{
              expand: true,
              cwd: 'assets/templates',
              src: ['**/*.jade'],
              dest: '.tmp/public/templates/',
              ext: '.html'
          }]
        }
    });
    grunt.loadNpmTasks('grunt-contrib-jade');
};