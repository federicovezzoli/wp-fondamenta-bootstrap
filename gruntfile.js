'use strict';

var fs = require('fs'),
    path = require('path'),
    crypto = require('crypto');

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
				require("postcss-import")(),
				require("postcss-url")(),
				require("postcss-cssnext")({
					browsers: ['last 2 versions', 'ie 10']
				}),
				require("postcss-browser-reporter")(),
				require("postcss-reporter")()
			]
		},
		dist: {
			src: 'assets/css/scss/*.css',
		},
		dev: {
			options: {
				map: true,
				processors: [
					require("postcss-import")(),
					require("postcss-url")(),
					require("postcss-cssnext")({
						browsers: ['last 2 versions', 'ie 10']
					}),
					require("postcss-browser-reporter")(),
					require("postcss-reporter")()
				]
			},
			src: 'assets/css/scss/*.css',
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
		build: ['assets/js/plugins.js', 'assets/js/head.js'],
		build: ['assets/css/*.map']
  	},

	imagemin: {
        dist: {
			options: {
			},
            files: [{
                expand: true,
                cwd: 'assets/img/',
                src: ['*.{png,jpg,gif}'],
                dest: 'assets/img/'
            }]
        }
    },

	svgmin: {
	    options: {
	        plugins: {
	            removeViewBox: false,
				removeEmptyAttrs: true,
				removeDesc: true,
				removeComments: true,
				removeMetadata: true,
				removeTitle: true,
				convertStyleToAttrs: true
	        }
	    },
	    dist: {
			files: [{
                expand: true,
                cwd: 'assets/img/',
                src: ['*.{png,jpg,gif}'],
                dest: 'assets/img/'
            }]
    	}
	}

  });

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-svgmin');

  // Register tasks
  grunt.registerTask('default', [
    'sass',
	'postcss:dist',
	'cssmin',
    'uglify:dist',
    'version',
	'imagemin',
	//'svgmin',
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

  grunt.registerTask('version', 'Set the versions for enqueued CSS/JS', function() {
    var options = this.options({
      file: 'lib/scripts.php',
      css: 'assets/css/screen.css',
      cssHandle: 'roots_app',
      js: 'assets/js/main.min.js',
      jsHandle: 'roots_main',
      jsPlugin: 'assets/js/plugins.min.js',
      jsPluginHandle: 'roots_plugins',
	  jsHeadHandle: 'roots_head',
	  jsHead: 'assets/js/head.min.js'
    });

    var scriptsPhp = options.file;

    // Hash the CSS
    var hashCss = md5(options.css);

    // Hash the JS
    var hashJs = md5(options.js);
    var hashPluginsJs = md5(options.jsPlugin);
	var hashHeadJs = md5(options.jsHead);

    // Update scripts.php to reference the new versions
    var regexCss = new RegExp("(wp_enqueue_style\\('" + options.cssHandle + "',(\\s*[^,]+,){2})\\s*[^\\)]+\\);");
    var regexJs = new RegExp("(wp_register_script\\('" + options.jsHandle + "',(\\s*[^,]+,){2})\\s*[^,]+,\\s*([^\\)]+)\\);");
    var regexPluginsJs = new RegExp("(wp_register_script\\('" + options.jsPluginHandle + "',(\\s*[^,]+,){2})\\s*[^,]+,\\s*([^\\)]+)\\);");
	var regexHeadJs = new RegExp("(wp_register_script\\('" + options.jsHeadHandle + "',(\\s*[^,]+,){2})\\s*[^,]+,\\s*([^\\)]+)\\);");

    var content = grunt.file.read(scriptsPhp);
    content = content.replace(regexCss, "$1 '" + hashCss + "');");
    content = content.replace(regexJs, "$1 '" + hashJs + "', " + "$3);");
    content = content.replace(regexPluginsJs, "$1 '" + hashPluginsJs + "', " + "$3);");
	content = content.replace(regexHeadJs, "$1 '" + hashHeadJs + "', " + "$3);");
    grunt.file.write(scriptsPhp, content);
    grunt.log.writeln('"' + scriptsPhp + '" updated with new CSS/JS versions.');
  });

  var md5 = function(filepath) {
	var hash = crypto.createHash('md5');
	hash.update(fs.readFileSync(filepath));
	grunt.log.write('Versioning ' + filepath + '...').ok();
	return hash.digest('hex');
  };
};
