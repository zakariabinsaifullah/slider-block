<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function gsb_block_assets() { 
	wp_register_style(
		'slider_block-cgb-style-css',
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ), 
		is_admin() ? array( 'wp-editor' ) : null,
		null 
	);

	// Register block editor script for backend.
	wp_register_script(
		'slider_block-cgb-block-js', 
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ),
		null, 
		true 
	);

	// Register block editor styles for backend.
	wp_register_style(
		'slider_block-cgb-block-editor-css',
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ),
		array( 'wp-edit-blocks' ),
		null 
	);
	register_block_type(
		'gsb/slider-block', array(
			'style'         => 'slider_block-cgb-style-css',
			'editor_script' => 'slider_block-cgb-block-js',
			'editor_style'  => 'slider_block-cgb-block-editor-css',
		)
	);
}
add_action( 'init', 'gsb_block_assets' );

/**
 * External Assets
*/
function gsb_enqueue_blocks_assets(){
	wp_enqueue_style( 'bootstrap-grid-css', plugins_url( '../dist/assets/css/bootstrap-grid.min.css', __FILE__ ));
	wp_enqueue_style( 'fancybox-css', plugins_url( '../dist/assets/css/jquery.fancybox.min.css', __FILE__ ));
	wp_enqueue_style( 'swiper-css', plugins_url( '../dist/assets/css/swiper.min.css', __FILE__ ));
	wp_enqueue_script( 'fancybox', plugins_url( '../dist/assets/js/jquery.fancybox.min.js', __FILE__ ), array('jquery'), time(), true  );
	wp_enqueue_script( 'swiper', plugins_url( '../dist/assets/js/swiper.min.js', __FILE__ ), array(), time(), true  );
	if( ! is_admin( )){
		wp_enqueue_script( 'plugin', plugins_url( '../dist/assets/js/plugin.js', __FILE__ ), array(), time(), true  );
	}
}
add_action( 'enqueue_block_assets', 'gsb_enqueue_blocks_assets' );

/*
 * New Category
 * */

function gsb_blocks_new_cat( $categories ){
	return array_merge(
		$categories,
		array(
			array(
				'title' => 'Slider Block',
				'slug'  => 'slider-block'
			)
		)
	);
}
add_filter( 'block_categories', 'gsb_blocks_new_cat' );
