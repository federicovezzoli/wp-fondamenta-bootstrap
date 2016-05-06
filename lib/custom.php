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