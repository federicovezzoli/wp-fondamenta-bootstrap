'use strict';
module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'assets/js/*.js',
        'assets/js/vendor/*.js',
        '!assets/js/scripts.min.js',
        '!assets/js/plugins.min.js',
        '!assets/js/head.min.js'
      ]
    },

	sass: {
		dist: {
			files: [{
				expand: true,
				//cwd: '/',
				src: ['scss/*.scss'],
				dest: 'assets/css',
				ext: '.css'
			}]
		}
	},

	postcss: {
		options: {
			map: {
				inline: true, // save all sourcemaps as separate files...
				annotation: 'maps' // ...to this specified directory
			},

			processors: [
				require('pixrem')(), // add fallbacks for rem units
				require('autoprefixer')({
					browsers: 'last 2 versions' // browsers: ['safari >= 9, ie >= 11, ie >= 8']
				}), // add vendor prefixes
				require('postcss-sorting')({
					"sort-order": "default",
					"empty-lines-between-children-rules": 0,
					"empty-lines-between-media-rules": 0,
					"preserve-empty-lines-between-children-rules": false
				})
			]
		},
		dist: {
			expand: true,
			flatten: true,
			src: 'assets/css/**/*.css',
			dest: 'assets/css'
		}
	},

    uglify: {
      dist: {
        files: {
          'assets/js/plugins.min.js': [
            'assets/js/vendor/*.js'
          ],
          'assets/js/main.min.js': [
          	'assets/js/inc/*.js',
          	'assets/js/main.js'
          ],
          'assets/js/head.min.js': [
          	'assets/js/head/*.js',
          ]
        }
      },
      dev: {
      	options: {
	      	beautify: true,
	      	preserveComments: true
      	},
	     files: {
          'assets/js/plugins.min.js': [
            'assets/js/vendor/*.js'
          ],
          'assets/js/main.min.js': [
          	'assets/js/inc/*.js',
          	'assets/js/main.js'
          ],
          'assets/js/head.min.js': [
          	'assets/js/head/*.js'
          ]

        }
      }
    },

    watch: {
      scripts: {
        files: [
          'assets/js/scritps_head/*.js',
          'assets/js/inc/*.js',
          'assets/js/main.js',
          'assets/js/plugins.js'
        ],
        tasks: [ 'uglify:dev']
      },
	  styles: {
  		  files: ['scss/**/*.scss'],
  		  tasks: ['generateCSS']
  	  },
      livereload: {
		  files: ['scss/**/*.scss', 'assets/css/*.css', 'assets/js/**/*.js', '*.html', '*.php', 'lib/*.php', 'templates/*.php', 'assets/img/**/*.{png,jpg,jpeg,gif,webp,svg}'],
		  options: {
			  livereload: true,
		},
	  },
    },

    clean: {
    	dist: [
        	'assets/js/plugins.min.js',
        	'assets/js/main.min.js',
        	'assets/js/head.min.js'
		]
  	}
  });

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-wp-version');

  // Register tasks
  grunt.registerTask('default', [
    'clean',
    'sass',
	'postcss',
    'uglify:dist',
    'version'
  ]);

  grunt.registerTask('generateCSS', [
	  'sass',
	  'postcss',
  ]);

  grunt.registerTask('dev', [
    'watch'
  ]);

};
