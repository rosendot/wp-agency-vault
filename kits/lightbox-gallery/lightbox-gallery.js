/**
 * Lightbox Gallery — full-screen image viewer with prev/next navigation.
 *
 * Usage: Include after lightbox-gallery.css. Auto-initializes on any
 * .lightbox-gallery element.
 */
(function () {
	'use strict';

	document.querySelectorAll( '.lightbox-gallery' ).forEach( function ( gallery ) {
		var thumbs  = gallery.querySelectorAll( '.lightbox-gallery__thumb' );
		var modal   = gallery.querySelector( '.lightbox-modal' );
		var img     = modal.querySelector( '.lightbox-modal__img' );
		var counter = modal.querySelector( '.lightbox-modal__counter' );
		var btnClose = modal.querySelector( '.lightbox-modal__close' );
		var btnPrev  = modal.querySelector( '.lightbox-modal__nav--prev' );
		var btnNext  = modal.querySelector( '.lightbox-modal__nav--next' );
		var current  = 0;
		var urls     = [];

		// Collect full-size image URLs from data-full or src
		thumbs.forEach( function ( thumb ) {
			var imgEl = thumb.querySelector( 'img' );
			urls.push( thumb.dataset.full || ( imgEl ? imgEl.src : '' ) );
		} );

		function show( index ) {
			current = ( index + urls.length ) % urls.length;
			img.src = urls[ current ];
			counter.textContent = ( current + 1 ) + ' / ' + urls.length;
			modal.classList.add( 'is-open' );
			document.body.style.overflow = 'hidden';
		}

		function hide() {
			modal.classList.remove( 'is-open' );
			document.body.style.overflow = '';
		}

		thumbs.forEach( function ( thumb, i ) {
			thumb.addEventListener( 'click', function () {
				show( i );
			} );
		} );

		btnClose.addEventListener( 'click', hide );
		btnPrev.addEventListener( 'click', function () { show( current - 1 ); } );
		btnNext.addEventListener( 'click', function () { show( current + 1 ); } );

		modal.addEventListener( 'click', function ( e ) {
			if ( e.target === modal ) hide();
		} );

		document.addEventListener( 'keydown', function ( e ) {
			if ( ! modal.classList.contains( 'is-open' ) ) return;
			if ( e.key === 'Escape' ) hide();
			if ( e.key === 'ArrowLeft' ) show( current - 1 );
			if ( e.key === 'ArrowRight' ) show( current + 1 );
		} );
	} );
})();
