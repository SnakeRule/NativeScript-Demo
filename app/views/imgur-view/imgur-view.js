var page;
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var OpenUrl = require( "nativescript-openurl" );
var Toast = require("nativescript-toast");
var imageStackLayout;
var obj;
var http = require("http");
var items;
var imgurLogo;
var clientId = "96e762d0ccd74f8";
var clientSecret = "0d57ac4d5af10e4e09905d7667b415b9298f00e4";
var imageListView;
var items = new ObservableArray([]);
var pageData = new Observable();
var requestUrl = "https://api.imgur.com/3/gallery/hot/viral/0.json"


exports.loaded = function(args) {
  page = args.object;
  page.bindingContext = pageData;
  imgurImage = page.getViewById("imgurImage");
  imageListView = page.getViewById("imageListView");
  imgurLogo = page.getViewById("imgurLogo");
  items = [];
  imgurLogo.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Imgur_logo.svg/2000px-Imgur_logo.svg.png";
  imgurLogo.width = 90;

  loadImages();
};

function loadImages()
{
  http.request({ 
    url: requestUrl,
    method: "GET",
    headers: {"authorization": "Client-ID " + clientId}
  }).then(function (response) {
    //// Argument (response) is HttpResponse!
    //// Content property of the response is HttpContent!
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
    }
    pageData.set("items", items)
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

exports.refresh = function(){
  items = [];
  imageListView.refresh();
  loadImages();
  var toast = Toast.makeText("List refreshed");
  toast.show();
}