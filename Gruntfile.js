module.exports = function(grunt) {
  grunt.initConfig({

    pug: {
      compile: {
        options: {
          client: false,
          pretty: true
        }, 
        files: [ {
          cwd: 'pug',
          src: '*.pug',
          dest: 'dist/',
          expand: true,
          ext: '.html'
        } ]
      }
    }, 

    copy: {
      main: {
        files: [
          {
            expand: true,
            src: ['images/**', '!images/**.psd', '!images/**.ai'],
            dest: 'dist/'
          }
        ]
      }
    }, 

    imagemin: {
      dynamic: {
        options: {
          optimizationLevel: 3
        },
        files: [ {
          expand: true,
          cwd: 'dist/images',
          src: ['**/*.{png, jpg, jpeg, gif}'],
          dest: 'dist/images/'
        } ]
      }
    }, 

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        }, 
        files: [{
          expand: true,
          cwd: 'dist/', 
          src: ['*.html'], 
          dist: 'dist/'
        }]
      }
    },

    cssmin: {
      options: {
        advanced: false,
        restructuring: false,
        aggressiveMerging: false,
        shorthandCompacting: false,
        semanticMerging: false,
        mediaMerging: false,
        rebase: false,
        roundingPrecision: -1
      },
      my_target: {
        files: [{
          expand: true,
          cwd: 'styles',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/styles/',
          ext: '.min.css'
        }]
      }
    },




    concat: {
      css: {
        src: ['styles/bootstrap.css', 'styles/main.css', 'styles/font-awesome.css', 'plugins/magnific/magnific-popup.css'],
        dest: 'dist/styles/main.css'
      },
      js: {
        src: ['scripts/jquery-1.9.1.min.js', 'scripts/unveil.js', 'scripts/main.js', 'plugins/magnific/jquery.magnific-popup.js'],
        dest:'dist/scripts/main.js'
      }
    },


    uglify: {
      build: {
        files: [ {
          expand: true,
          cwd: 'dist/scripts',
          src: '*.js',
          dest: 'dist/scripts/',
          ext: '.min.js'
        } ]
      }
    },

    sass: {
      dist: {
        files: [ {
          expand: true,
          cwd: 'styles/sass',
          src: ['*.scss'],
          dest: 'dist/styles',
          ext: '.css'
        } ]
      }
    },

    csso: {
      dynamic: {
        expand: true, 
        cwd: 'dist/styles',
        src: ['*.css', '!*.min.css'],
        dest: 'dist/styles/',
        ext: '.min.css'
      }
    }, 

    watch: {
      configFiles: {
        files: ["**/*.pug", "**/*.scss"],
        tasks: ['dist'], 
        options: {
          debounceDelay: 250
        }
      }
    }


  });

  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-csso');
  grunt.loadNpmTasks('grunt-string-replace');


  // grunt.registerTask('dist', ['pug', 'copy', 'imagemin', 'htmlmin', 'concat', 'csso', 'uglify']);
  grunt.registerTask('dist', ['pug', 'sass', 'copy', 'imagemin']);
};