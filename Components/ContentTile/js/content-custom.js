jQuery(document).ready(function() {
    jQuery('.cardslider').slick({
        infinite: false,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: jQuery(".card_arrow_prev"),
        appendDots: jQuery('.slick-slider-dots'),
        nextArrow: jQuery(".card_arrow_next"),
        dots: true,
        touchMove: true,
        responsive: [
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
        ]        
    });
});