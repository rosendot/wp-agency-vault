<?php
/**
 * Add a Meta Box with Custom Fields
 *
 * Usage: Copy into functions.php. Replace 'service' with your CPT slug.
 * Update field names and labels as needed.
 */
function mytheme_add_meta_box() {
	add_meta_box(
		'custom_details',        // Unique ID
		'Details',               // Box title in editor
		'mytheme_meta_box_html', // Callback function
		'service',               // Post type slug
		'normal',                // Context (normal, side, advanced)
		'high'                   // Priority
	);
}
add_action( 'add_meta_boxes', 'mytheme_add_meta_box' );

function mytheme_meta_box_html( $post ) {
	$price = get_post_meta( $post->ID, '_item_price', true );
	wp_nonce_field( 'mytheme_meta_nonce', 'mytheme_meta_nonce_field' );
	?>
	<p>
		<label for="item_price">Price ($):</label><br>
		<input type="text" id="item_price" name="item_price" value="<?php echo esc_attr( $price ); ?>">
	</p>
	<?php
}

function mytheme_save_meta( $post_id ) {
	if ( ! isset( $_POST['mytheme_meta_nonce_field'] ) ) {
		return;
	}
	if ( ! wp_verify_nonce( $_POST['mytheme_meta_nonce_field'], 'mytheme_meta_nonce' ) ) {
		return;
	}
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}
	if ( isset( $_POST['item_price'] ) ) {
		update_post_meta( $post_id, '_item_price', sanitize_text_field( $_POST['item_price'] ) );
	}
}
add_action( 'save_post_service', 'mytheme_save_meta' );
