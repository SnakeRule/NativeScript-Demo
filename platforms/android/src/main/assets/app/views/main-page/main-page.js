// aloitussivun koodi

var frameModule = require("ui/frame");

exports.pageLoaded = function() {
};

exports.secondView = function(){
  var topmost = frameModule.topmost();
  topmost.navigate("views/second-view/second-view");
};