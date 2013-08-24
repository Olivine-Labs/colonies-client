var hbsfy = require("hbsfy");
var config = require("./src/config/config.js");

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */',
        sourceMap: './src/public/build/js/app.map.js'
      },

      build: {
        src: './src/public/build/js/app.js',
        dest: './src/public/build/js/app.min.js'
      }
    },

    browserify2: {
      main: {
        entry: './src/assets/js/app.js',
        compile: './src/public/build/js/app.js',

        expose: {
          backbone: 'backbone'
        },

        beforeHook: function(bundle){
          bundle.transform(hbsfy);
        }
      }
    },

    jshint: {
      // define the files to lint
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true,
          require: true
        }
      }
    },

    less: {
      development: {
        options: {
          paths: ["./src/assets/css"]
        },
        files: {
          "./src/public/build/css/app.css": "./src/assets/css/app.less"
        }
      },
      production: {
        options: {
          paths: ["./src/assets/css"],
          yuicompress: true
        },
        files: {
          "./src/public/build/css/app.css": "./src/assets/css/app.less"
        }
      }
    },

    watch: {
      scripts: {
        files: './src/assets/js/**/*.js',
        tasks: ['build-js'],
        options: {
          interrupt: true
        }
      },
      templates: {
        files: './src/templates/**/*.hbs',
        tasks: ['build-js'],
        options: {
          interrupt: true
        }
      },
      stylesheets: {
        files: './src/assets/css/**/*.less',
        tasks: ['build-less'],
        options: {
          interrupt: true
        }
      }
    },
  });

  grunt.loadNpmTasks('grunt-browserify2');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');

  // Default task(s).
  grunt.registerTask('build-less', ['less']);
  grunt.registerTask('build-js', ['browserify2', 'uglify']);

  grunt.registerTask('default', ['build-js', 'build-less']);
};

