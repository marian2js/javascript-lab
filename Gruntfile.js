require('./index');

module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-karma');

  // Project configuration.
  grunt.initConfig({
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    }
  });

  // Run tests //
  grunt.registerTask('test', [
    'karma'
  ]);

  // Build tasks //
  grunt.registerTask('build', [

  ]);

  // Default tasks //
  grunt.registerTask('default', [
    'test',
    'build'
  ]);
};