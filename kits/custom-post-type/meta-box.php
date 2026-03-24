<?php
/**
 * Meta Box with Custom Fields
 *
 * Replace 'service' with your CPT slug.
 * Add more fields by duplicating the input blocks and save logic.
 */

function mytheme_add_meta_box() {
    add_meta_box(
        'custom_details',
        'Details',
        'mytheme_meta_box_html',
        'service',
        'normal',
        'high'
    );
}
add_action( 'add_meta_boxes', 'mytheme_add_meta_box' );

function mytheme_meta_box_html( $post ) {
    $price = get_post_meta( $post->ID, '_item_price', true );
    $description = get_post_meta( $post->ID, '_item_description', true );
    wp_nonce_field( 'mytheme_meta_nonce', 'mytheme_meta_nonce_field' );
    ?>
    <p>
        <label for="item_price">Price ($):</label><br>
        <input type="text" id="item_price" name="item_price"
               value="<?php echo esc_attr( $price ); ?>" style="width: 100px;">
    </p>
    <p>
        <label for="item_description">Short Description:</label><br>
        <textarea id="item_description" name="item_description"
                  rows="3" style="width: 100%;"><?php echo esc_textarea( $description ); ?></textarea>
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
    if ( isset( $_POST['item_description'] ) ) {
        update_post_meta( $post_id, '_item_description', sanitize_textarea_field( $_POST['item_description'] ) );
    }
}
add_action( 'save_post_service', 'mytheme_save_meta' );
