var page;


// kutsutaan sivun latauteass
exports.loaded = function(args) {
  // page muuttujan kautta päästään käsiksi ui elementteihin
  page = args.object;
  
};

exports.onNavBtnTap = onNavBtnTap;
// kutsutaan kun painetaan takaisin nappia navi palkista
function onNavBtnTap()
{
  var frameModule = require("ui/frame");
  var topmost = frameModule.topmost();

  topmost.goBack();
}