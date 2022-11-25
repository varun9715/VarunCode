function createMaps(){
const myLoacation = { lat: 43.780022, lng: -79.41605 };
var opts = {
center: myLoacation,
streetViewControl:false,
mapTypeControl:false,
fullscreenControl:false,
zoom: 12,
minZoom: 0,
};
var map = new google.maps.Map(document.getElementById('map'), opts);
const marker = new google.maps.Marker({
    position: myLoacation,
    map,
  });
}

