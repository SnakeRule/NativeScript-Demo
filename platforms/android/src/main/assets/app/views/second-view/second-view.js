var page;
var textSource;
var textTarget;

exports.loaded = function(args) {
  page = args.object;
};

exports.showText = function(){
  textSource = page.getViewById("textSource");
  textTarget = page.getViewById("textTarget");
  textTarget.text = textSource.text;
};
