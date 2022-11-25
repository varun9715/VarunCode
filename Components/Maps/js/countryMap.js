var ImgUrl = "https://snazzy-maps-cdn.azureedge.net/assets/marker-87dcc371-fbb5-4cad-9a1c-d4a04b8d5057.png";

var geocoder;
var map;

async function initialize() {
  ///calling JSON file for data
  var ceterPoint = await JSONCall('HeadquarterCity').then((data) => data)

  geocoder = new google.maps.Geocoder();

  var latlng = new google.maps.LatLng(ceterPoint[0].center_lat, ceterPoint[0].center_lng);
  
  var mapOptions = {
    zoom: ceterPoint[0]?.zoom?ceterPoint[0].zoom:5,
    center: latlng,
    styles: [{ "featureType": "all", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative", "elementType": "labels.text.fill", "stylers": [{ "color": "#444444" }] }, { "featureType": "administrative.country", "elementType": "geometry", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape", "elementType": "all", "stylers": [{ "color": "#f2f2f2" }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "visibility": "on" }] }, { "featureType": "landscape", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "color": "#DDF1F2" }] }, {
      "featureType": "landscape",

      "elementType": "geometry.stroke", "stylers": [{ "visibility": "on" }]
    }, {
      "featureType": "administrative.province",
      "elementType": "geometry.stroke",
      "stylers": [{ "visibility": "off" }]
    }, { "featureType": "landscape", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape", "elementType": "labels.text", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape", "elementType": "labels.text.fill", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape", "elementType": "labels.text.stroke", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape.natural.terrain", "elementType": "geometry.fill", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "road", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "road.highway", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "road.arterial", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#d8d6cc" }, { "visibility": "off" }] }, { "featureType": "water", "elementType": "geometry.fill", "stylers": [{ "color": "#DDF1F2" }] }, { "featureType": "water", "elementType": "labels.text", "stylers": [{ "visibility": "off" }] }],
    maxZoom: ceterPoint[0]?.maxZoom?ceterPoint[0].maxZoom:20,
    minZoom: ceterPoint[0]?.minZoom?ceterPoint[0].minZoom:3,
    mapTypeId: 'roadmap',
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,

  }
  map = new google.maps.Map(document.getElementById('map'), mapOptions);

  map.data.loadGeoJson('json/' + ceterPoint[0].short_name + `.json`);
  map.data.setStyle({
    fillColor: "#ffffff",
    fillOpacity: 1,
    strokeWeight: 0,
  })

  Marker()


}
////marker function for pointing location
async function Marker() {
  var markerposition = await JSONCall('HeadquarterCity').then((data) => data)

  for (let i = 0; i < markerposition.length; i++) {

    const contentString =
      '<div id="content">' +
      '<div id="siteNotice">' +
      "</div>" +
      `<span class="type">${markerposition[i].location_type}</span>` + 
      `<h2 id="firstHeading" class="firstHeading">${markerposition[i].name}</h2>` +
      '<div id="bodyContent" class="maptooltip">' +
      `<p>${markerposition[i].content}</p>` +

      "</div>" +
      "</div>";

    const marker = new google.maps.Marker({

      position: new google.maps.LatLng(markerposition[i].lat, markerposition[i].lng),
      icon: ImgUrl,
      optimized: true,
      map: map,
      label: { text: markerposition[i].name, className: "labels" },

    });
    const infoWindow = new google.maps.InfoWindow({
      content: contentString,
      marker: marker,
      maxWidth: 479,
      border: false,
      pointer: "10px",
      shadow: false,
      closeOnMapClick: true,
      closeWhenOthersOpen: true,
    });
    marker.addListener('mouseover', () => {

      document.querySelectorAll("img[src^='https://snazzy-maps-cdn.azureedge.net/assets/marker-87dcc371-fbb5-4cad-9a1c-d4a04b8d5057.png']")[i].parentElement.classList = 'pinIcon'
      infoWindow.open(map, marker)
    })
    marker.addListener('mouseout', () => {
      document.querySelectorAll("img[src^='https://snazzy-maps-cdn.azureedge.net/assets/marker-87dcc371-fbb5-4cad-9a1c-d4a04b8d5057.png']")[i].parentElement.className = "";
      infoWindow.close()
    })

  }
}
///Json call function
async function JSONCall(file) {
  var location = document.querySelector('select').value
  return await fetch('json/' + file + '.json').then(response => response.json())
    .then(data => data.filter((country) => country.short_name == location));
}
