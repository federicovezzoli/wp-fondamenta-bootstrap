<?php
/**
 * Custom functions
 */

/*-----------------------------------------------------------------------------------*/
/* Disable Emoji */
/*-----------------------------------------------------------------------------------*/

remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'wp_print_styles', 'print_emoji_styles' );


/*-----------------------------------------------------------------------------------*/
/* WPML custom language selector */
/*-----------------------------------------------------------------------------------*/

define('ICL_DONT_LOAD_LANGUAGE_SELECTOR_CSS', true);


/*-----------------------------------------------------------------------------------*/
/* git-ftp settings per .git/config */
/*-----------------------------------------------------------------------------------*/

/*
[git-ftp]
    user = xxxxxxx
    url = ftp.xxxxxx.it/public_html/content/
    password = xxxxxxxxx
*/

/*-----------------------------------------------------------------------------------*/
/* ACF Google Maps API */
/*-----------------------------------------------------------------------------------*/

function my_acf_google_map_api( $api ){

	$api['key'] = 'xxx';

	return $api;

}

add_filter('acf/fields/google_map/api', 'my_acf_google_map_api');

/*-----------------------------------------------------------------------------------*/
/* settaggio di iubenda per avere il banner nel footer e disattivare lo styling di default */
/*-----------------------------------------------------------------------------------*/

/* <script type="text/javascript">
	var _iub = _iub || [];
	_iub.csConfiguration = {
		cookiePolicyId: 7952970,
		siteId: 338686,
		lang: "en",
banner: {
      slideDown: false,
      applyStyles: false
    }
	};
</script>
<script type="text/javascript" src="//cdn.iubenda.com/cookie_solution/safemode/iubenda_cs.js" charset="UTF-8" async></script> */

/*-----------------------------------------------------------------------------------*/
/* grunt-wp-version script da usare in version.js */
/*-----------------------------------------------------------------------------------*/


/* 
'use strict';

var fs = require('fs'),
    path = require('path'),
    crypto = require('crypto');

module.exports = function(grunt) {
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


*/
