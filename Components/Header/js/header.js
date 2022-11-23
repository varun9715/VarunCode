jQuery('.header_wrapper_img').each(function() {
    var width = jQuery(window).width();
    if(width > 767){
        var img_src = jQuery(this).find('.header_desk_img').attr('src');       
        jQuery(this).css('background-image','url("'+ img_src +'")');
    }  
});