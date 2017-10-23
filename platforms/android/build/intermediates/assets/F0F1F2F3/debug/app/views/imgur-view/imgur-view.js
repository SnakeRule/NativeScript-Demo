var page;
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
// Openurl plugin auttaa avamaan linkin selaimessa
var OpenUrl = require( "nativescript-openurl" );
// Haetaan käyttöön toast -plugin
var Toast = require("nativescript-toast");
// http auttaa tekemään get kyselyn APIin
var http = require("http");
// muuttuja joko imgurin logo tallennetaan
var imgurLogo;
// imgurin apin avain
var clientId = "96e762d0ccd74f8";
//var clientSecret = "0d57ac4d5af10e4e09905d7667b415b9298f00e4";
var imageListView;
// ObservableArray jota käytetään listan täyttöön
var items = new ObservableArray([]);
// Observable joka täyttää listan ui elementissä
var pageData = new Observable();
// apin kyselyn osoite
var requestUrl = "https://api.imgur.com/3/gallery/hot/viral/0.json"

// kutsutaan sivun latauteass
exports.loaded = function(args) {
  // page muuttujan kautta päästään käsiksi ui elementteihin
  page = args.object;
  // pageData elementillä pystytään muuttamaan listview dataa
  page.bindingContext = pageData;
  // Haetaan imgur logon ui elementti ja ladataan logo
  imgurLogo = page.getViewById("imgurLogo");
  imgurLogo.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Imgur_logo.svg/2000px-Imgur_logo.svg.png";
  imgurLogo.width = 90;

  //Haetaan listview elementti johon kuvat tuodaan
  imageListView = page.getViewById("imageListView");
  // observableArray johon näytettävä data tallennetaan
  items = [];

  loadImages();
};

// Tässä funktiossa haetaan kuvat ja niiden tiedot sekä asetetaan ne listview elementtiin
function loadImages()
{
  // http kysely
  http.request({ 
    url: requestUrl,
    method: "GET",
    headers: {"authorization": "Client-ID " + clientId}
  }).then(function (response) {
    // vastaus tulee response objektina
    // response objektin content saadaan JSON objektiksi
    var jsonObj = response.content.toJSON();

    // Haetaan 20 ensimmäistä kuvaa for loopilla
    for(i = 0; i < 20; i++) {
      // element muuttujaan tallennetaan json objektin data
      var element = jsonObj.data[i];
      
      // Jos kyseessä on yksittäinen kuva element.images on null
      if(element.images == null)
      {
      imgSrc = element.link.toString();
      }
      // Jos kyseessä on albumi haetaan images arraystä albumin ensimmäinen kuva
      else
      {
        var data = element.images[0];
        imgSrc = data.link.toString();
      }

      // lisätään äskettäin haetut asiat items listaan
      // Tämä lista on siis suoraan yhteydessä ui-elementteihin {{imageSrc}} jne...
      items.push({
        imageSrc: imgSrc,
        imageDesc: element.title,
        // itemId on linkki kuvaan
        itemId: element.id
      })
    }
    // Tässä asetetaan items data ui-listaan
    pageData.set("items", items)
  }, function (e) {
    //// Argument (e) is Error!
});
}

exports.onNavBtnTap = onNavBtnTap;
// kutsutaan kun painetaan takaisin nappia navi palkista
function onNavBtnTap()
{
  var frameModule = require("ui/frame");
  var topmost = frameModule.topmost();

  topmost.goBack();
}

// Kutsutaan kun jotakin listan kuvaa painetaan
function onItemTap(args) {
  var itemIndex = args.index;

  // tässä haetaan painetun kohdan ui elementit
  page = args.view;
  // linkki kuvaan saadaan hakemalla piilotetun listImageId:n teksti
  link = page.getViewById("listImageId");

  // käytetään openurl pluginia linkin avaamiseen, yksinkertaista
  OpenUrl("https://imgur.com/gallery/" + link.text);
}
exports.onItemTap = onItemTap;

// kutsutaan kun painetaan navibarin refresh nappia
exports.refresh = function(){
  // nollataan listat ja kutsutaan loadImages uudelleen
  items = [];
  imageListView.refresh();
  loadImages();
  // näytetään toast että lista on päivitetty
  var toast = Toast.makeText("List refreshed");
  toast.show();
}