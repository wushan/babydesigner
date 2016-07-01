/**
 * `clean`
 *
 * ---------------------------------------------------------------
 *
 * Remove the files and folders in your Sails app's web root
 * (conventionally a hidden directory called `.tmp/public`).
 *
 * For usage docs see:
 *   https://github.com/gruntjs/grunt-contrib-clean
 *
 */
module.exports = function(grunt) {

  grunt.config.set('clean', {
      dev: [
        getFolderPath('fonts/**'),
        getFolderPath('images/**'),
        getFolderPath('images/**'),
        getFolderPath('js/**'),
        getFolderPath('styles/**'),
        getFolderPath('*.*')
      ],
      build: ['www']
    });

  grunt.loadNpmTasks('grunt-contrib-clean');
};

function getFolderPath(folderName){
  return '.tmp/public/' + folderName;
}