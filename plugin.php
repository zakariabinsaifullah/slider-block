<?php
/**
 * Plugin Name: Gutenberg Slider Block
 * Description: A Gutenberg Slider Block developed with swiper js library. It is light-weight and tiny. Easy to work, no extra configuration.
 * Author: Zakaria Binsaifullah
 * Author URI: https://devzakaria.com/
 * Version: 3.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package GSB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
