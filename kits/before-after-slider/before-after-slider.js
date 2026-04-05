/**
 * Before/After Slider — draggable divider to compare two images.
 *
 * Usage: Include after before-after-slider.css. Auto-initializes on any
 * .ba-slider__container element.
 */
(function () {
	'use strict';

	document.querySelectorAll( '.ba-slider__container' ).forEach( function ( container ) {
		var beforeWrap = container.querySelector( '.ba-slider__before-wrap' );
		var divider    = container.querySelector( '.ba-slider__divider' );
		var handle     = container.querySelector( '.ba-slider__handle' );
		var isDragging = false;

		function setPosition( x ) {
			var rect = container.getBoundingClientRect();
			var pct  = Math.max( 0, Math.min( 100, ( ( x - rect.left ) / rect.width ) * 100 ) );
			beforeWrap.style.width = pct + '%';
			divider.style.left     = pct + '%';
			handle.style.left      = pct + '%';
		}

		// Set initial position from data attribute
		var startPct = parseFloat( container.dataset.start ) || 50;
		beforeWrap.style.width = startPct + '%';
		divider.style.left     = startPct + '%';
		handle.style.left      = startPct + '%';

		// Mouse events
		container.addEventListener( 'mousedown', function ( e ) {
			isDragging = true;
			setPosition( e.clientX );
		} );

		document.addEventListener( 'mousemove', function ( e ) {
			if ( isDragging ) {
				e.preventDefault();
				setPosition( e.clientX );
			}
		} );

		document.addEventListener( 'mouseup', function () {
			isDragging = false;
		} );

		// Touch events
		container.addEventListener( 'touchstart', function ( e ) {
			isDragging = true;
			setPosition( e.touches[0].clientX );
		}, { passive: true } );

		document.addEventListener( 'touchmove', function ( e ) {
			if ( isDragging ) {
				setPosition( e.touches[0].clientX );
			}
		}, { passive: true } );

		document.addEventListener( 'touchend', function () {
			isDragging = false;
		} );
	} );
})();
