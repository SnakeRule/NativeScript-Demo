
var observableModule = require("data/observable");
var observableArray = require("data/observable-array");
var images = new observableArray.ObservableArray([]);
var pageData = new observableModule.Observable();

// API vaatii http'n
var http = require("http");

// Oma API-key
var api_key = 'bcf5fefd6469d9518414a3a2e790ae31';

// Lataa sivun
function pageLoaded(args) {
    var page = args.object;
    pageData.set("images", images);
    page.bindingContext = pageData;
}
exports.pageLoaded = pageLoaded;

// Ajetaan hakunappia painettaessa
exports.search = function() {
	while(images.length>0){
		images.pop();
	}
    // Kutsutaan APIa ja annetaan sille api-key ja hakukentän teksti
	http.getJSON("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key="+api_key+"&text="+pageData.get('txtKeyword')+"&format=json&nojsoncallback=1&per_page=5").then(function (r) {
        // r = JSON
	    var imgUrl = '';
	    var photoList = r.photos.photo;

        // Käydään saatu JSON-data läpi ja näytetään kuvat listassa
	    for(var i=0;i<photoList.length;i++){
	    	imgUrl = "https://farm"+photoList[i].farm+".staticflickr.com/"+photoList[i].server+"/"+photoList[i].id+"_"+photoList[i].secret+".jpg";
	    	images.push({ img: imgUrl });
	    }
	}, function (e) {
	    alert('error: ' + e);
	    console.log(e);
	});

};

exports.onNavBtnTap = onNavBtnTap;
// kutsutaan kun painetaan takaisin nappia navi palkista
function onNavBtnTap()
{
  var frameModule = require("ui/frame");
  var topmost = frameModule.topmost();

  topmost.goBack();
}
