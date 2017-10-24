// aloitussivun koodi

var frameModule = require("ui/frame");

exports.pageLoaded = function() {
};

exports.cameraView = function(){
  var topmost = frameModule.topmost();
  topmost.navigate("views/camera-view/camera-view");
};

exports.imgurView = function(){
  var topmost = frameModule.topmost();
  topmost.navigate("views/imgur-view/imgur-view");
};

exports.flickrView = function(){
  var topmost = frameModule.topmost();
  topmost.navigate("views/flickr-view/flickr-view");
};

exports.mapView = function(){
  var topmost = frameModule.topmost();
  topmost.navigate("views/map-view/map-view");
};