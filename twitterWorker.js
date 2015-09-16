var query = "seuss";
var sentiment = 0;
var count = 0;
var like = /love|like|good|great|rocks/;
var dontlike = /hate|bad|sucks|lame/;

var twitterURL = "http://search.twitter.com/search.json?q=" + query + "&rpp=10&since_id=1&callback=handleSearchResult";
	
function getTwitterSearchResult() {
	importScripts(twitterURL);
    setTimeout("getTwitterSearchResult()", 5000);
} 

function handleSearchResult(jsonObj) {
	var tweets = jsonObj.results;
	twitterURL = "http://search.twitter.com/search.json" + jsonObj.refresh_url + "&callback=handleSearchResult";
	
    for (var i = 0; i < tweets.length; i++) {
	    var tweet = tweets[i].text;
		tweet = tweet.toLowerCase();
	    if (tweet.search(like) !== -1) {
	        sentiment += 1;
	    }
        if (tweet.search(dontlike) !== -1) {
	        sentiment -= 1;
	    }
	    count++;
    }
	postMessage({"query": query, "sentiment": sentiment, "count": count});
} 

getTwitterSearchResult();
