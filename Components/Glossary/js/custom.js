jQuery(document).ready(function () {
    jQuery('.accordion-list .panelCustomContent').hide();
    jQuery('.accordion-list').attr({
        role: 'tablist',
        multiselectable: 'true'
    });
    jQuery('.accordion-list').attr({
        role: 'tablist',
        multiselectable: 'true'
    });
    jQuery('.accordion-list .panelCustomContent').attr('id', function (IDcount) {
        return 'panel-' + IDcount;
    });
    jQuery('.accordion-list .panelCustomContent').attr('aria-labelledby', function (IDcount) {
        return 'control-panel-' + IDcount;
    });
    jQuery('.accordion-list .panelCustomContent').attr('aria-hidden', 'true');
    jQuery('.accordion-list .panelCustomContent').attr('role', 'tabpanel');
    jQuery('.accordion-list .panel-title').each(function (i) {
        $target = jQuery(this).next('.accordion-list .panelCustomContent')[0].id;
        $link = $('<a>', {
            'href': '#' + $target,
            'aria-expanded': 'false',
            'aria-controls': $target,
            'id': 'control-' + $target,
        });
        jQuery(this).wrapInner($link);
    });

    jQuery('.accordion-list .panel-title a').click(function () {
        if (jQuery(this).attr('aria-expanded') == 'false') {
            jQuery(this).parents('.accordion-list').find('[aria-expanded=true]').attr('aria-expanded', false).removeClass('active').parent().next('.accordion-list .panelCustomContent').slideUp(200).attr('aria-hidden', 'true');
            jQuery(this).attr('aria-expanded', true).addClass('active').parent().next('.accordion-list .panelCustomContent').slideDown(200).attr('aria-hidden', 'false');
        } else {
            jQuery(this).attr('aria-expanded', false).removeClass('active').parent().next('.accordion-list .panelCustomContent').slideUp(200).attr('aria-hidden', 'true');
        }
        return false;
    });

    jQuery(".accordion-list .panel-title:first a").trigger("click");
    
});

jQuery(window).on('load resize', function () {

    var windowWidth = jQuery(window).width();
    var containerWidth = jQuery('.glossaryInfoPanel').width();
    var containerOffset = jQuery('.glossaryInfoPanel').offset().left;
    var gridLeft = containerWidth * 0.30;
    var gridRight = containerWidth * 0.70;

    jQuery('.tooltip_txt').each(function (index, item) {

        var linkleft = jQuery(this).offset().left;
        var linkright = jQuery(this).offset().left;
        var tooltipClass = 'tooltip_txt-' + index;
        var countTooltipTxt = jQuery(this).attr('tooltip').length;
        jQuery(this).addClass(tooltipClass);
        var linkcontainerpos = linkleft - containerOffset + 22;

        if ((linkleft) <= gridLeft) {
            jQuery(this).addClass('tooltip_txt_left');
        } else if (linkright >= gridRight) {
            jQuery(this).addClass('tooltip_txt_right');
        } else {
            jQuery(this).removeClass('tooltip_txt_left');
            jQuery(this).removeClass('tooltip_txt_right');
        }

        var tooltipAppend = '<style>.tooltip_txt.' + tooltipClass + ':after{width: ' + containerWidth + 'px;left:' + -linkcontainerpos + 'px !important;}</style>';

        if (750 > windowWidth) {
            jQuery('body').append(tooltipAppend);
        }

        if (750 < windowWidth) {
            if (countTooltipTxt > 120) {
                jQuery('body').append(tooltipAppend);
                jQuery(this).addClass('tooltip_bigtxt');
            }
        }

    });

});
