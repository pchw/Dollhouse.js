module.exports = (grunt) ->
  grunt.initConfig
    watch:
      src: 
        files: ["src/*.coffee"]
        tasks: 'coffee'
      sample_jade:
        files: ["samples/*.jade"]
        tasks: 'jade'
      sample_coffee:
        files: ["samples/*.coffee"]
        tasks: 'coffee:sample'

    coffee:
      sample:
        files:
          'samples/index.js': 'samples/*.coffee'
      src:
        files:
          'dest/dollhouse.js': 'src/*.coffee'
    jade:
      compile:
        options:
          pretty: true
        files: [
          expand: true
          cwd: 'samples/'
          src: '*.jade'
          dest: 'samples/'
          ext: '.html'
        ]

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-jade'

  grunt.registerTask 'default', ['coffee','jade','watch']