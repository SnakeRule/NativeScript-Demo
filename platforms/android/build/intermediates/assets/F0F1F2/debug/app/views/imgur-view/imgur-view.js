var page;
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var gestures = require("ui/gestures");
var Toast = require("nativescript-toast");
var OpenUrl = require( "nativescript-openurl" );
var LoadingIndicator = require("nativescript-loading-indicator").LoadingIndicator;
var imageStackLayout;
var obj;
var imageModule = require("ui/image");
var labelModule = require("ui/label");
var buttonModule = require("ui/button");
var stackLayoutModule = require("ui/layouts/stack-layout");
var http = require("http");
var items;
var imgurImage;
var imgurLogo;
var imgSrc;
var data;
var str;
var clientId = "96e762d0ccd74f8";
var clientSecret = "0d57ac4d5af10e4e09905d7667b415b9298f00e4";
var imageListView;
var imgCounter = 0;
var colorCounter = 0;
var links = [];
var listView;
var stackLayouts = [];
var items = new ObservableArray([]);
var pageData = new Observable();


exports.loaded = function(args) {
  page = args.object;
  page.bindingContext = pageData;
  imgurImage = page.getViewById("imgurImage");
  imageListView = page.getViewById("imageListView");
  imgurLogo = page.getViewById("imgurLogo");
  imgCounter = 0;
  colorCounter = 0;
  links = [];
  items = [];
  listView = page.getViewById("imageListView");
  stackLayouts = [];
  imgurLogo.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Imgur_logo.svg/2000px-Imgur_logo.svg.png";
  imgurLogo.width = 90;

  var loader = new LoadingIndicator();
  loader.show(); // options is optional
  loadImages();
  loader.hide();
};

function loadImages()
{
  //imageStackLayout.removeChildren();

  http.request({ 
    url: "https://api.imgur.com/3/gallery/hot/viral/0.json",
    method: "GET",
    headers: {"authorization": "Client-ID " + clientId}
  }).then(function (response) {
    //// Argument (response) is HttpResponse!
    //// Content property of the response is HttpContent!
    str = response.content.toString();
    var jsonObj = response.content.toJSON();

    for(i = 0; i < 20; i++) {

      var element = jsonObj.data[i];
      
      if(element.images == null)
      {
      imgSrc = element.link.toString();
      }
      else
      {
        var data = element.images[0];
        imgSrc = data.link.toString();
      }

      items.push({
        imageSrc: imgSrc,
        imageDesc: element.title,
        itemId: element.id
      })

      links.push(element.id);

      imgCounter++;
      colorCounter++;
    }

    pageData.set("items", items)
    imageListView.visibility = "visible";
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

function onItemTap(args) {
  var itemIndex = args.index;

  page = args.view;
  link = page.getViewById("listImageId");

  OpenUrl("https://imgur.com/gallery/" + link.text);
}
exports.onItemTap = onItemTap;
