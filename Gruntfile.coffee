module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    watch:
      src: 
        files: ["src/*.coffee"]
        tasks: ['coffee', 'uglify']
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
    uglify:
      options:
        banner: '''
        /*! <%= pkg.title || pkg.name %>
        * v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>
        * <%= pkg.homepage %>
        * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;
        */

        '''
      dest:
        files:
          'dest/dollhouse.min.js': ['dest/dollhouse.js']

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
  grunt.loadNpmTasks 'grunt-contrib-uglify'

  grunt.registerTask 'default', ['coffee','jade','watch']