 // Hiding the panel content. If JS is inactive, content will be displayed
  $( '.panelCustomContent' ).hide();

  // Preparing the DOM
  
  // -- Update the markup of accordion-list container 
  $( '.accordion-list' ).attr({
    role: 'tablist',
    multiselectable: 'true'
   });

  // -- Adding ID, aria-labelled-by, role and aria-labelledby attributes to panel content
  $( '.panelCustomContent' ).attr( 'id', function( IDcount ) { 
    return 'panel-' + IDcount; 
  });
  $( '.panelCustomContent' ).attr( 'aria-labelledby', function( IDcount ) { 
    return 'control-panel-' + IDcount; 
  });
  $( '.panelCustomContent' ).attr( 'aria-hidden' , 'true' );
  // ---- Only for accordion-list, add role tabpanel
  $( '.accordion-list .panelCustomContent' ).attr( 'role' , 'tabpanel' );
  
  // -- Wrapping panel title content with a <a href="">
  $( '.panel-title' ).each(function(i){
    
    // ---- Need to identify the target, easy it's the immediate brother
    $target = $(this).next( '.panelCustomContent' )[0].id;
    
    // ---- Creating the link with aria and link it to the panel content
    $link = $( '<a>', {
      'href': '#' + $target,
      'aria-expanded': 'false',
      'aria-controls': $target,
      'id' : 'control-' + $target,
    });
    
    // ---- Output the link
    $(this).wrapInner($link);  
    
  });

  // Optional : include an icon. Better in JS because without JS it have non-sense.
  // $( '.panel-title a' ).append('<span class="icon">+</span>');

  // Now we can play with it
  $( '.panel-title a' ).click(function() {
    
    if ($(this).attr( 'aria-expanded' ) == 'false'){ //If aria expanded is false then it's not opened and we want it opened !
      
      // -- Only for accordion-list effect (2 options) : comment or uncomment the one you want
      
      // ---- Option 1 : close only opened panel in the same accordion-list
      //      search through the current accordion-list container for opened panel and close it, remove class and change aria expanded value
      $(this).parents( '.accordion-list' ).find( '[aria-expanded=true]' ).attr( 'aria-expanded' , false ).removeClass( 'active' ).parent().next( '.panelCustomContent' ).slideUp(200).attr( 'aria-hidden' , 'true');

      // Option 2 : close all opened panels in all accordion-list container
      //$('.accordion-list .panel-title > a').attr('aria-expanded', false).removeClass('active').parent().next('.panelCustomContent').slideUp(200);
      
      // Finally we open the panel, set class active for styling purpos on a and aria-expanded to "true"
      $(this).attr( 'aria-expanded' , true ).addClass( 'active' ).parent().next( '.panelCustomContent' ).slideDown(200).attr( 'aria-hidden' , 'false');

    } else { // The current panel is opened and we want to close it

      $(this).attr( 'aria-expanded' , false ).removeClass( 'active' ).parent().next( '.panelCustomContent' ).slideUp(200).attr( 'aria-hidden' , 'true');;

    }
    // No Boing Boing
    return false;
  });
 
    $(".panel-title:first a").trigger("click");

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
    