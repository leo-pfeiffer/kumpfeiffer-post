(function($) {
    "use strict";
    const previous = document.getElementById('btnPrevious');
    const next = document.getElementById('btnNext');
    const gallery = document.getElementById('image-gallery');
    const pageIndicator = document.getElementById('page');
    const galleryDots = document.getElementById('gallery-dots');

    const images = [];
    let i;
    for (i = 0; i < 100; i++) {
        images.push({
            title: "Image " + (i + 1),
            source: "images/castle.jpeg"
        });
    }

    const perPage = 16;
    let page = 1;
    const pages = Math.ceil(images.length / perPage);


    // Gallery dots
    for (i = 0; i < pages; i++){
        const dot = document.createElement('button');
        const dotSpan = document.createElement('span');
        const dotNumber = document.createTextNode(`${i + 1}`);
        dot.classList.add('gallery-dot');
        dot.setAttribute('data-index', i);
        dotSpan.classList.add('sr-only');

        dotSpan.appendChild(dotNumber);
        dot.appendChild(dotSpan)

        dot.addEventListener('click', function(e) {
            const self = e.target;
            goToPage(self.getAttribute('data-index'))
        })

        galleryDots.appendChild(dot)
    }

    // Previous Button
    previous.addEventListener('click', function() {
        if (page === 1) {
            page = 1;
        } else {
            page--;
            showImages();
        }
    })

    // Next Button
    next.addEventListener('click', function() {
        if (page < pages) {
            page++;
            showImages();
        }
    })

    // Jump to page
    function goToPage(index) {
        index = parseInt(index);
        page =  index + 1;

        showImages();
    }

    // Load images
    function showImages() {
        while(gallery.firstChild) gallery.removeChild(gallery.firstChild)

        const offset = (page - 1) * perPage;
        const dots = document.querySelectorAll('.gallery-dot');

        for (let i = 0; i < dots.length; i++){
            dots[i].classList.remove('active');
        }

        dots[page - 1].classList.add('active');

        for (let i = offset; i < offset + perPage; i++) {
            if ( images[i] ) {
                const gridItem = document.createElement('div');
                gridItem.classList.add('gla_anim_box')
                gridItem.classList.add('grid-item')

                const template = document.createElement('div');
                template.classList.add('template')

                const lightbox = document.createElement('a');
                lightbox.setAttribute("href", images[i].source);
                lightbox.classList.add("lightbox")

                const img = document.createElement('img');
                img.setAttribute("src", images[i].source);

                lightbox.appendChild(img)
                template.appendChild(lightbox);
                gridItem.appendChild(template)
                gallery.appendChild(gridItem);
            }
        }

        $('.lightbox').magnificPopup({
            type: 'image',
            gallery:{
                enabled:true
            }
        });

        // Animate images
        const galleryItems = document.querySelectorAll('.template');
        for (let i = 0; i < galleryItems.length; i++) {
            const onAnimateItemIn = animateItemIn(i);
            setTimeout(onAnimateItemIn, i * 100);
        }

        function animateItemIn(i) {
            const item = galleryItems[i];
            return function() {
                item.classList.add('animate');
                item.classList.add('gla_shop_item');
            }
        }

        // Update page indicator
        pageIndicator.textContent = "Page " + page + " of " + pages;

    }

    showImages();
})(jQuery);