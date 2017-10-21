var page;
var textSource;
var textTarget;
var pic;
var savedPic;
var takePicButton;
var imgurUploadButton;
var imageSourceModule = require("image-source");
var camera = require("nativescript-camera");
var socialShare = require("nativescript-social-share");
var imageModule = require("ui/image");
var frameModule = require("ui/frame");
var options = {saveToGallery: true };
var Toast = require("nativescript-toast");

//var clientId = "96e762d0ccd74f8";
//var clientSecret = "0d57ac4d5af10e4e09905d7667b415b9298f00e4";


exports.loaded = function(args) {
  page = args.object;

  imgurUploadButton = page.getViewById("imgurUploadButton");
  imgurUploadButton.visibility = "collapse";
  pic = page.getViewById("picResult");
  takePicButton = page.getViewById("takePicButton");

  if(takePicButton.text == "Retake picture")
  {
    imgurUploadButton.visibility = "visible";
  }
};

exports.takePicture = function(){
  // Pyydetään kameralle käyttöluvat
  camera.requestPermissions();
  // Otetaan kuva
  camera.takePicture(options)   
  // Tämä kutsutaan kun kuva on otettu
  .then(function (imageAsset) {
      console.log("Result is an image asset instance");
      var image = new imageModule.Image();
      image.src = imageAsset;
      pic.src = imageAsset;
      takePicButton.text = "Retake picture";
      imgurUploadButton.visibility = "visible";

      var toast = Toast.makeText("Picture saved to gallery");
      toast.show();
  }).catch(function (err) {
      console.log("Error -> " + err.message);
  });
};

exports.socialUpload = function(){
  socialShare.shareImage(pic.imageSource, "How would you like to share this image?");
};

exports.onNavBtnTap = onNavBtnTap;

function onNavBtnTap()
{
  var frameModule = require("ui/frame");
  var topmost = frameModule.topmost();

  topmost.goBack();
}

