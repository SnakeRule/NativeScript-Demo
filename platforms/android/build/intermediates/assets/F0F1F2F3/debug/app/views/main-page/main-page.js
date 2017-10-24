// aloitussivun koodi

var frameModule = require("ui/frame");
var dialogs = require("ui/dialogs");
var email = require("nativescript-email");
var exit = require("nativescript-exit");

let options = {
  title: "Exit",
  message: "Are you sure you want to exit the application?",
  okButtonText: "Yes",
  cancelButtonText: "Cancel",
};

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

exports.showCredits = function(){
  dialogs.alert({
    title: "Credits",
    message: "Demo created by\nJere Valtanen\nTiia Aarnio\nAmini Borhan",
    okButtonText: "Return"
}).then(function () {
    console.log("Dialog closed!");
});
};

exports.sendFeedback = function(){

  email.compose({
    subject: "Feedback on NS demo",
    body: "Wow, Everything is so <strong>NATIVE</strong>",
    to: ['jerevaltanen@gmail.com']
}).then(
  function() {
    console.log("Email composer closed");
  }, function(err) {
    console.log("Error: " + err);
  });
};

exports.exitDialog = function() {
  confirm(options).then((result) => {
    exit();
});
};