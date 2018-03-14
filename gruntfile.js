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
			options: {
				style: 'compact'
			},
			files: [{
				expand: true,
				//cwd: '/',
				src: ['scss/*.scss'],
				dest: 'assets/css/',
				ext: '.css'
			}]
		}
	},

	cssmin: {
  		target: {
    		files: [{
      			expand: true,
      			cwd: 'assets/css/scss/',
      			src: ['*.css'],
      			dest: 'assets/css',
      			ext: '.css'
    		}]
  		}
	},

	copy: {
  		main: {
    		expand: true,
    		cwd: 'assets/css/scss/',
    		src: '**',
    		dest: 'assets/css',
  		},
	},

	postcss: {
		options: {
			map: false,
			processors: [
				//require("postcss-import")(),
				//require("postcss-url")(),
				require("postcss-cssnext")(),
				// and if you want to compress
				// Disable autoprefixer, because it's already included in cssnext
				//require("cssnano")({ autoprefixer: false }),
				//require("postcss-browser-reporter")(),
				//require("postcss-reporter")(),
			]
		},
		dist: {
			expand: true,
			flatten: true,
			src: 'assets/css/scss/*.css',
			dest: 'assets/css'
		},
		dev: {
			options: {
				map: true,
				processors: [
					//require("postcss-import")(),
					//require("postcss-url")(),
					require("postcss-cssnext")(),
					// and if you want to compress
					// Disable autoprefixer, because it's already included in cssnext
					//require("cssnano")({ autoprefixer: false }),
					//require("postcss-browser-reporter")(),
					//require("postcss-reporter")(),
				]
			},
			expand: true,
			flatten: true,
			src: 'assets/css/scss/*.css',
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
	      	preserveComments: true,
			mangle: false
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
          'assets/js/head/*.js',
          'assets/js/inc/*.js',
		  'assets/js/vendor/*.js',
          'assets/js/main.js',
          'assets/js/plugins.js'
        ],
        tasks: [ 'uglify:dev'],
		options: {
			livereload: true
		}
      },
	  styles: {
  		  files: ['scss/**/*.scss'],
  		  tasks: ['generateCSSdev'],
		  options: {
			  livereload: true
		  }
  	  },
      files: {
		  files: ['*.html', '*.php', 'lib/*.php', 'templates/*.php', 'assets/img/*'],
		  options: {
			  livereload: true
		  }
	  }
    },
    
    clean: {
        folder: ['assets/css/scss'],
		build: ['assets/js/plugins.js', 'assets/js/main.js', 'assets/js/head.js'],
		build: ['assets/css/*.map']
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
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Register tasks
  grunt.registerTask('default', [
    'sass',
	'postcss:dist',
	'cssmin',
    'uglify:dist',
    'version',
    'clean'
  ]);

  grunt.registerTask('generateCSS', [
	  'sass',
	  'postcss:dist',
  ]);

  grunt.registerTask('generateCSSdev', [
	  'sass',
	  'postcss:dev',
	  'copy'
  ]);

  grunt.registerTask('dev', [
    'watch'
  ]);
};
