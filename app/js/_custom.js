document.addEventListener("DOMContentLoaded", function () {
    lazyLoadImage();
    
    const scrollNews_wrap = document.querySelector('.scrollNews_wrap');

    if (scrollNews_wrap) {
        const scrollNews_slider = new Splide('.scrollNews_wrap', {
            perPage: 3,
            perMove: 1,
            gap: 20,
            arrows: false,
            pagination: false,
            breakpoints: {
                1200: {
                    perPage: 2,
                    gap: 20,
                },
                960: {
                    perPage: 2,
                    gap: 20,
                },
                740: {
                    perPage: 1,
                    gap: 20,
                },
            },
        });
        scrollNews_slider.mount(window.splide.Extensions);
    }

    const headerBottom_tags = document.querySelector('.headerBottom_tags');

    if (headerBottom_tags) {
        const headerBottom_slider = new Splide('.headerBottom_tags', {

            perMove: 1,
            gap: 40,
            autoWidth: true,
            arrows: false,
            pagination: false,
            breakpoints: {
                1200: {
                    gap: 20,
                },
                960: {
                    gap: 20,
                },
                740: {
                    gap: 20,
                },
            },
        });
        headerBottom_slider.mount(window.splide.Extensions);
    }

    const header = document.getElementById('header');
    const menu_btn = document.getElementById('menu__btn');
    const headerMenu = document.getElementById('headerMenu');
    const menu__close = document.getElementById('menu__close');
    
    if(menu_btn){
        menu_btn.addEventListener('click', function () {
            menu_btn.style.display = 'none';
            menu__close.style.display = 'block';
            headerMenu.style.left = '0px';
            header.style.position = 'sticky';
    
        })
    }

    if(menu_btn){
        menu__close.addEventListener('click', function () {
            menu_btn.style.display = 'block';
            menu__close.style.display = 'none';
            headerMenu.style.left = '-100%';
            header.style.position = 'static';
        })
    }

});
