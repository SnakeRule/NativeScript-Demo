
var mapsModule = require("nativescript-google-maps-sdk");

exports.onNavBtnTap = onNavBtnTap;
// kutsutaan kun painetaan takaisin nappia navi palkista
function onNavBtnTap()
{
  var frameModule = require("ui/frame");
  var topmost = frameModule.topmost();

  topmost.goBack();
}

function onMapReady(args) {
  var mapView = args.object;

  console.log("Setting a marker...");
  var marker = new mapsModule.Marker();
  marker.position = mapsModule.Position.positionFromLatLng(62.2333333, 25.7333333);
  marker.title = "Sydney";
  marker.snippet = "Australia";
  marker.userData = { index : 1};
  mapView.addMarker(marker);
  
  // Disabling zoom gestures
  mapView.settings.zoomGesturesEnabled = false;
  mapView.settings.compassEnabled = true;
}

function onMarkerSelect(args) {
   console.log("Clicked on " +args.marker.title);
}

function onCameraChanged(args) {
    console.log("Camera changed: " + JSON.stringify(args.camera)); 
}

exports.onMapReady = onMapReady;
exports.onMarkerSelect = onMarkerSelect;
exports.onCameraChanged = onCameraChanged;