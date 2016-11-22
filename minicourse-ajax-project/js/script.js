
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!
         var streetName = $("input:text#street").val();
    
    var cityName = $('input#city').val();
    var address = streetName + ", " + cityName;
    var imgURL= "http://maps.googleapis.com/maps/api/streetview?size=600x300&location="+ address + " ";
    $body.append('<img class="bgimg" src="' + imgURL + '">');

//NYTimes AJAX request
var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
url += '?' + $.param({
  'api-key': "266e8c7e6639429c92b5200758ac03fd",
  'q': cityName,
});
$.ajax({
  url: url,
  method: 'GET',
}).done(function(result) {
$nytHeaderElem.text("New York Times articles about " + cityName);
var articles= result.response.docs;
for (var i=0; i<articles.length; i++) {
    var article=articles[i];
    $nytElem.append('<li class="article"><a href="'+ article.web_url +'">'+ article.headline.main +'</a>'+'<p>'+ article.snippet+'</p>'+'</li>');
};

}).fail(function(err) {
  $nytHeaderElem.text("New York Times articles about " + cityName+" cannot be loaded");
});

//Wiki

var wikiURL = "http://en.wikipedia.org/w/api.php?action=opensearch&search="+ cityName + "&format=json&callback=wikiCallback";
var wikiRequestTimeout =  setTimeout(function() {
    $("#wikipedia-header").text("Wikipedia links about " + cityName + " cannot be loaded. sorry!");
}, 9000 );

$.ajax({
    url: wikiURL,
    dataType:  "jsonp",
}).done(function(data) {
    $("#wikipedia-header").text("Wikipedia links about " + cityName);
    var articles= data[1];

    for (var j=0; j<articles.length; j++) {
    var article=articles[j];
    var url="http://en.wikipedia.org/wiki" + article;
    $wikiElem.append('<li><a href="'+ url +'">'+ article +'</a>'+ '</li>');
    };
    clearTimeout(wikiRequestTimeout);
    });
//<p><'+ article'</p>

    return false;
};

$('#form-container').submit(loadData);


