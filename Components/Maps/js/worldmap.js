var imgUrlVal = document.getElementById('mapimage').value;
var ImgUrl = imgUrlVal;

var centerLang = parseInt(document.getElementById('centerLangitude').value);
var centerLat = parseInt(document.getElementById('centerLatitude').value);
var maxZoom = parseInt(document.getElementById('maxZoom').value);
var minZoom = parseInt(document.getElementById('minZoom').value);
var defaultZoom = parseInt(document.getElementById('defaultZoom').value);

var markerJson = JSON.parse(document.getElementById('markerJson').value);

var markerposition = markerJson;

// var markerposition = [
//   {
//     lat: 56.130366,
//     lng: -106.346771,
//     type: "info",
//     label: 'Canada',
//     content: 'TORONTO, ON – Building on over a decade of climate change efforts, Ontario Teachers’ Pension Plan Board (Ontario Teachers’) today announced its commitment.'

//   },
//   {
//     lat: -4.442038, lng: -61.326854,
//     type: "info",
//     label: 'Latin',
//     content: 'TORONTO, ON – Building on over a decade of climate change efforts, Ontario Teachers’ Pension Plan Board (Ontario Teachers’) today announced its commitment.'
//   },
//   {
//     lat: 54.525961, lng: 15.255119,
//     type: "info",
//     label: 'Europe',
//     content: 'TORONTO, ON – Building on over a decade of climate change efforts, Ontario Teachers’ Pension Plan Board (Ontario Teachers’) today announced its commitment.'

//   },
//   {
//     lat: 34.047863, lng: 100.619655,
//     type: "info",
//     label: 'Asia',
//     content: 'TORONTO, ON – Building on over a decade of climate change efforts, Ontario Teachers’ Pension Plan Board (Ontario Teachers’) today announced its commitment.'

//   }
// ]

function createMap() {

  var opts = {
    center: {
      lat: centerLat,
      lng: centerLang,
    },
    zoom: defaultZoom,
    styles: [{ "featureType": "all", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative", "elementType": "labels.text.fill", "stylers": [{ "color": "#444444" }] }, { "featureType": "administrative.country", "elementType": "geometry", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape", "elementType": "all", "stylers": [{ "color": "#f2f2f2" }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }] }, { "featureType": "landscape", "elementType": "geometry.stroke", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape", "elementType": "labels.text", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape", "elementType": "labels.text.fill", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape", "elementType": "labels.text.stroke", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape.natural.terrain", "elementType": "geometry.fill", "stylers": [{ "saturation": "18" }] }, { "featureType": "poi", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "road", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": 45 }] }, { "featureType": "road.highway", "elementType": "all", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "road.arterial", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#d8d6cc" }, { "visibility": "on" }] }, { "featureType": "water", "elementType": "geometry.fill", "stylers": [{ "color": "#DDF1F2" }] }, { "featureType": "water", "elementType": "labels.text", "stylers": [{ "visibility": "off" }] }, {
      "featureType": "administrative.province",
      "elementType": "geometry.stroke",
      "stylers": [{ "visibility": "off" }]
    }],
    maxZoom: maxZoom,
    minZoom: minZoom,
    clickableIcons: true,
    clickableIcons: true,
    disableDoubleClickZoom: true,
    draggable: true,
    keyboardShortcuts: true,
    scrollwheel: true,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,

  };

  var map = new google.maps.Map(document.getElementById('map'), opts);

  for (let i = 0; i < markerposition.length; i++) {

    const contentString =
      '<div id="content">' +
      '<div id="siteNotice">' +
      "</div>" +
      '<span class="type">TYPE, LOCATION</span>' +
      `<h2 id="firstHeading" class="firstHeading">${markerposition[i].label}</h2>` +
      '<div id="bodyContent" class="maptooltip">' +
      `<p>${markerposition[i].content}</p>` +

      "</div>" +
      "</div>";

    const marker = new google.maps.Marker({

      position: new google.maps.LatLng(markerposition[i].lat, markerposition[i].lng),
      icon: ImgUrl,
      optimized: true,
      map: map,
      label: { text: markerposition[i].label, className: "labels" },

    });
    const infoWindow = new google.maps.InfoWindow({
      content: contentString,

      maxWidth: 479,

    });

    marker.addListener('click', () => {
      var markerIcon = document.querySelectorAll("img[src^='"+ImgUrl+"']")[i].parentElement.classList = 'pinIcon'
      infoWindow.open({
        anchor: marker,
        map,
      });
    })
    // marker.addListener('mouseout', () => {
    //   document.querySelectorAll("img[src^='"+ImgUrl+"']")[i].parentElement.className = "";
    //   infoWindow.close()
    // })

  }

  var marker = new google.maps.Marker();

}

window.addEventListener('DOMContentLoaded', (event) => {
  createMap();
});