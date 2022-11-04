jQuery(document).ready(function () {
    jQuery(".-video-link a").click(function (e) {
        e.preventDefault();
        var videohref = jQuery(this).attr("href");
        jQuery(".video_lightbox_frame").attr("src", videohref);
        jQuery(".video_lightbox_overlay").show();
        jQuery(".video_lightbox").slideDown();
    });
    jQuery(".video_lightbox_close").click(function (e) {
        e.preventDefault();
        jQuery(".video_lightbox").slideUp();
        jQuery(".video_lightbox_frame").attr("src", "");
    });
    jQuery(".video_lightbox_overlay").click(function (e) {
        jQuery(".video_lightbox").slideUp();
        jQuery(".video_lightbox_frame").attr("src", "");
    });
    jQuery(document).on("keyup", function (evt) {
        if (27 == evt.keyCode) {
            jQuery(".video_lightbox").slideUp();
            jQuery(".video_lightbox_frame").attr("src", "");
        }
    });
});