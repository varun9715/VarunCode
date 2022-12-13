new WOW().init();
jQuery(document).ready(function($){
     'use strict';
  
    $.Scrollax();
  });

  var scrollActive=document.querySelectorAll('.infoPanel');

  window.addEventListener('scroll',function(){
    for(let i=0;i<scrollActive.length;i++){
      var data=parseFloat(scrollActive[i]?.style?.transform?.split('translateY')[1]?.split(/[()]/)[1])
      if(data>0){
        scrollActive[i].classList.add("infoPanelactive")
      }
      else{
        scrollActive[i].classList.remove("infoPanelactive")
      }
    }
  })