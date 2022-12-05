
var addressLatitude = parseInt(document.getElementById('addressLatitude').value);
var addressLongitude = parseInt(document.getElementById('addressLongitude').value);
var addressZoom = parseInt(document.getElementById('addressZoom').value);
var addressMinZoom = parseInt(document.getElementById('addressMinZoom').value);

function createMaps(){
const myLoacation = { lat: addressLatitude, lng: addressLongitude };
var opts = {
center: myLoacation,
streetViewControl:false,
mapTypeControl:false,
fullscreenControl:false,
zoom: addressZoom,
minZoom: addressMinZoom,
};
var map = new google.maps.Map(document.getElementById('map'), opts);
const marker = new google.maps.Marker({
    position: myLoacation,
    map,
  });
}

