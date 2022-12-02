if (jQuery('.convertedImage').length > 0){
    jQuery('.convertedImage').each(function() {
        var width = jQuery(window).width();
        if(width > 767){
            var img_src = jQuery(this).find('.desktop-image').attr('src');       
            jQuery(this).css('background-image','url("'+ img_src +'")');
        }  
    });
}