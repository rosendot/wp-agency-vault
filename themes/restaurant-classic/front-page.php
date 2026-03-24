<?php get_header(); ?>

<main class="home">

    <!-- Hero -->
    <section class="hero">
        <div class="hero__content">
            <p class="hero__label">Welcome to</p>
            <h1 class="hero__title"><?php bloginfo('name'); ?></h1>
            <p class="hero__text"><!-- PLACEHOLDER: Hero description text about the business --></p>
            <div class="hero__buttons">
                <a href="<?php echo esc_url(home_url('/menu')); ?>" class="btn btn--primary">Order Online</a>
                <a href="<?php echo esc_url(home_url('/about')); ?>" class="btn btn--outline">Our Story</a>
            </div>
        </div>
    </section>

    <!-- Fan Favorites Carousel -->
    <section class="section section--cream featured-items">
        <div class="section__header">
            <h2 class="section__title">Fan Favorites</h2>
        </div>
        <div class="carousel">
            <div class="carousel__track">
                <div class="carousel__slide">
                    <div class="featured-card">
                        <div class="placeholder-image placeholder-image--square">Photo</div>
                        <h3 class="featured-card__name">Item Name</h3>
                        <p class="featured-card__description">Short description of the dish</p>
                        <span class="featured-card__price">$ 0.00</span>
                    </div>
                </div>
                <div class="carousel__slide">
                    <div class="featured-card">
                        <div class="placeholder-image placeholder-image--square">Photo</div>
                        <h3 class="featured-card__name">Item Name</h3>
                        <p class="featured-card__description">Short description of the dish</p>
                        <span class="featured-card__price">$ 0.00</span>
                    </div>
                </div>
                <div class="carousel__slide">
                    <div class="featured-card">
                        <div class="placeholder-image placeholder-image--square">Photo</div>
                        <h3 class="featured-card__name">Item Name</h3>
                        <p class="featured-card__description">Short description of the dish</p>
                        <span class="featured-card__price">$ 0.00</span>
                    </div>
                </div>
                <div class="carousel__slide">
                    <div class="featured-card">
                        <div class="placeholder-image placeholder-image--square">Photo</div>
                        <h3 class="featured-card__name">Item Name</h3>
                        <p class="featured-card__description">Short description of the dish</p>
                        <span class="featured-card__price">$ 0.00</span>
                    </div>
                </div>
                <div class="carousel__slide">
                    <div class="featured-card">
                        <div class="placeholder-image placeholder-image--square">Photo</div>
                        <h3 class="featured-card__name">Item Name</h3>
                        <p class="featured-card__description">Short description of the dish</p>
                        <span class="featured-card__price">$ 0.00</span>
                    </div>
                </div>
                <div class="carousel__slide">
                    <div class="featured-card">
                        <div class="placeholder-image placeholder-image--square">Photo</div>
                        <h3 class="featured-card__name">Item Name</h3>
                        <p class="featured-card__description">Short description of the dish</p>
                        <span class="featured-card__price">$ 0.00</span>
                    </div>
                </div>
                <div class="carousel__slide">
                    <div class="featured-card">
                        <div class="placeholder-image placeholder-image--square">Photo</div>
                        <h3 class="featured-card__name">Item Name</h3>
                        <p class="featured-card__description">Short description of the dish</p>
                        <span class="featured-card__price">$ 0.00</span>
                    </div>
                </div>
                <div class="carousel__slide">
                    <div class="featured-card">
                        <div class="placeholder-image placeholder-image--square">Photo</div>
                        <h3 class="featured-card__name">Item Name</h3>
                        <p class="featured-card__description">Short description of the dish</p>
                        <span class="featured-card__price">$ 0.00</span>
                    </div>
                </div>
            </div>
            <div class="carousel__dots"></div>
        </div>
        <div class="section__footer">
            <a href="<?php echo esc_url(home_url('/menu')); ?>" class="btn btn--outline-dark">View Menu</a>
        </div>
    </section>

    <!-- Visit Us -->
    <section class="section section--dark visit-us">
        <div class="section__header">
            <h2 class="section__title" style="color: var(--color-secondary);">Visit Us</h2>
            <p class="section__subtitle">Walk-ins welcome, or call ahead for parties of 6 or more</p>
        </div>
        <div class="visit-us__grid">
            <div class="visit-us__map">
                <!-- PLACEHOLDER: Replace src with client's Google Maps embed URL -->
                <div class="placeholder-image" style="width:100%; height:100%; min-height:350px; border-radius:8px;">Google Maps Embed</div>
            </div>
            <div class="visit-us__info">
                <div class="visit-us__detail">
                    <h3>Location</h3>
                    <p><!-- PLACEHOLDER: Street Address --><br><!-- PLACEHOLDER: City, ST 00000 --></p>
                </div>
                <div class="visit-us__detail">
                    <h3>Hours</h3>
                    <p><!-- PLACEHOLDER: Weekday hours --><br><!-- PLACEHOLDER: Weekend hours --></p>
                </div>
                <div class="visit-us__detail">
                    <h3>Contact</h3>
                    <p><!-- PLACEHOLDER: Phone --><br><!-- PLACEHOLDER: Email --></p>
                </div>
                <a href="tel:+15550000000" class="btn btn--primary">Call (555) 000-0000</a>
            </div>
        </div>
    </section>

    <!-- Photo Gallery Carousel -->
    <section class="section gallery-section">
        <div class="section__header">
            <h2 class="section__title">Gallery</h2>
        </div>
        <div class="carousel carousel--gallery">
            <div class="carousel__track">
                <div class="carousel__slide"><div class="placeholder-image placeholder-image--gallery">Photo 1</div></div>
                <div class="carousel__slide"><div class="placeholder-image placeholder-image--gallery">Photo 2</div></div>
                <div class="carousel__slide"><div class="placeholder-image placeholder-image--gallery">Photo 3</div></div>
                <div class="carousel__slide"><div class="placeholder-image placeholder-image--gallery">Photo 4</div></div>
                <div class="carousel__slide"><div class="placeholder-image placeholder-image--gallery">Photo 5</div></div>
                <div class="carousel__slide"><div class="placeholder-image placeholder-image--gallery">Photo 6</div></div>
                <div class="carousel__slide"><div class="placeholder-image placeholder-image--gallery">Photo 7</div></div>
                <div class="carousel__slide"><div class="placeholder-image placeholder-image--gallery">Photo 8</div></div>
            </div>
            <div class="carousel__dots"></div>
        </div>
    </section>

</main>

<?php get_footer(); ?>
