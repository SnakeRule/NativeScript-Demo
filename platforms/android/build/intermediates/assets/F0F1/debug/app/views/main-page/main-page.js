// aloitussivun koodi

var frameModule = require("ui/frame");

exports.pageLoaded = function() {
};

exports.cameraView = function(){
  var topmost = frameModule.topmost();
  topmost.navigate("views/camera-view/camera-view");
};