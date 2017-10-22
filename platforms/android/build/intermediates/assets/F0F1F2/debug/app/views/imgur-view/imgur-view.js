var page;
var gestures = require("ui/gestures");
var Toast = require("nativescript-toast");
var OpenUrl = require( "nativescript-openurl" );
var imageStackLayout;
var obj;
var imageModule = require("ui/image");
var labelModule = require("ui/label");
var buttonModule = require("ui/button");
var stackLayoutModule = require("ui/layouts/stack-layout");
var http = require("http");
var imgurImage;
var imgurLogo;
var data;
var str;
var clientId = "96e762d0ccd74f8";
var clientSecret = "0d57ac4d5af10e4e09905d7667b415b9298f00e4";
var imgCounter = 0;
var colorCounter = 0;

exports.loaded = function(args) {
  page = args.object;
  imgurImage = page.getViewById("imgurImage");
  imageStackLayout = page.getViewById("imageStackLayout");
  imgurLogo = page.getViewById("imgurLogo");
  imgCounter = 0;
  colorCounter = 0;
  imgurLogo.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Imgur_logo.svg/2000px-Imgur_logo.svg.png";
  imgurLogo.width = 90;

  loadImages();
};

function loadImages()
{
  http.request({ 
    url: "https://api.imgur.com/3/gallery/hot/viral/0.json",
    method: "GET",
    headers: {"authorization": "Client-ID " + clientId}
  }).then(function (response) {
    //// Argument (response) is HttpResponse!
    //// Content property of the response is HttpContent!
    str = response.content.toString();
    var jsonObj = response.content.toJSON();
    console.dir(jsonObj.data.length);

    for(i = 0; i < 10; i++) {

      if(imgCounter >= 10)
      break;
      if(colorCounter == 2)
      colorCounter = 0

      var element = jsonObj.data[i];
      if(element.images == null)
      {

      console.dir(element);
      var newImage = new imageModule.Image();
      newImage.src = element.link.toString();
      newImage.stetch = "none";
      newImage.style.margin = "10";

      var newLabel = new labelModule.Label();
      newLabel.text = element.title;

      }
      else
      {

          var data = element.images[0];
          //console.dir(data);
          var newImage = new imageModule.Image();
          newImage.src = data.link.toString();
          newImage.stetch = "none";
          newImage.style.margin = "10";
    
          var newLabel = new labelModule.Label();
          newLabel.text = element.title;

      }
      stackLayout.on(gestures.GestureTypes.tap, function (args) {
        OpenUrl("https://imgur.com/gallery/" + element.id);
    });

      stackLayout.addChild(newImage);
      stackLayout.addChild(newLabel);

      imageStackLayout.addChild(stackLayout);

      newImage = null;
      if(colorCounter == 0)
      stackLayout.style.backgroundColor = "pink";
      else
      stackLayout.style.backgroundColor = "white";
      imgCounter++;
      colorCounter++;
    }

}, function (e) {
    //// Argument (e) is Error!
});
}

exports.onNavBtnTap = onNavBtnTap;

function onNavBtnTap()
{
  var frameModule = require("ui/frame");
  var topmost = frameModule.topmost();

  topmost.goBack();
}
