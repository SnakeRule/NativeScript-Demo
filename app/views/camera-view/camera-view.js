var page;
// kuva tallennetaan tähän muuttujaan
var pic;
// nappi jolla otetaan kuva
var takePicButton;
// tämä nappi vaihdetaan takepicbuttonin tilalle kun ensimmäinen kuva on otettu
var takeAnotherPicButton;
var imgurUploadButton;
// otetaan käyttöön kamera plugin, jolla päästään käyttämään kameraa
var camera = require("nativescript-camera");
// haetaan käyttöön social share plugin, auttaa jakamisessa
var socialShare = require("nativescript-social-share");
// kuva tallennetaan tähän muuttujaan
var imageModule = require("ui/image");
var frameModule = require("ui/frame");
// kameran funktioon annetaan arguementtina options
var options = {saveToGallery: true };
// Haetaan käyttöön toast -plugin
var Toast = require("nativescript-toast");

// Kutsutaan sivun latautuessa
exports.loaded = function(args) {
  // page muuttujan kautta päästään käsiksi ui elementteihin
  page = args.object;

  // haetaan share nappi
  imgurUploadButton = page.getViewById("imgurUploadButton");
  // piilotetaan share nappi
  imgurUploadButton.visibility = "collapse";
  // haetaan kuvan ui-image elementti valmiiksi
  pic = page.getViewById("picResult");
  // kuvanottonappi haetaan
  takePicButton = page.getViewById("takePicButton");
  takeAnotherPicButton = page.getViewById("takePicButton2");
    // Pyydetään kameralle käyttöluvat
    camera.requestPermissions();

    // näytetään uuden kuvan ottamisnappi jos kuvanottamisnappi on piilotettu
  if(takePicButton.visibility == "collapse")
  {
    imgurUploadButton.visibility = "visible";
  }
};

// kutsutaan kun painetaan nappia jolla otetaan kuva
exports.takePicture = function(){
  // Otetaan kuva
  camera.takePicture(options)   
  // Tämä kutsutaan kun kuva on otettu
  .then(function (imageAsset) {
      //image muuttujaan tallennetaan kuva
      var image = new imageModule.Image();
      // tallennetaan kuva muihin muuttujiin
      image.src = imageAsset;
      pic.src = imageAsset;
      //piilotetaan nappi
      takePicButton.visibility = "collapsed";
      //näytetään toinen nappi
      takeAnotherPicButton.visibility = "visible";
      //näytetään share nappi
      imgurUploadButton.visibility = "visible";
      // näytetään toast joka kertoo kuvan tallentuneen galleriaan
      var toast = Toast.makeText("Picture saved to gallery");
      toast.show();
  }).catch(function (err) {
      console.log("Error -> " + err.message);
  });
};

// Tätä kutsutaan kun painetaa share nappia
exports.socialUpload = function(){
  // social share plugin hoitaa jakamisen, annetaan sille vain kuva joka jaetaan ja jakoviesti
  socialShare.shareImage(pic.imageSource, "How would you like to share this image?");
};

exports.onNavBtnTap = onNavBtnTap;
// kutsutaan kun painetaan takaisin nappia navi palkista
function onNavBtnTap()
{
  var frameModule = require("ui/frame");
  var topmost = frameModule.topmost();

  topmost.goBack();
}

