var page;
var textSource;
var textTarget;
var pic;
var camera = require("nativescript-camera");
var imageModule = require("ui/image");

exports.loaded = function(args) {
  page = args.object;
  pic = page.getViewById("picResult");
  camera.requestPermissions();
};

exports.takePicture = function(){
  camera.takePicture()   
  .then(function (imageAsset) {
      console.log("Result is an image asset instance");
      var image = new imageModule.Image();
      image.src = imageAsset;
      pic.src = imageAsset;
  }).catch(function (err) {
      console.log("Error -> " + err.message);
  });
};
