module.exports = function(tweets){
	var output = [];
	//What keys do we want?
	var properties = ["status_id","time","tweet_text","faves","retweets","replies","link","clicks","reach"];
//Loop through each member of tweets array
for (var i = 0; i < tweets.length; i++) {
	var link = tweets[i].links;
	for (var key in link) {
	  var linkurl = key;
	  var linkclicks = link[key];
	}
	var badges = tweets[i].badges;
	for (var key in badges) {
	  var reach = badges[key];
	}
	//process text for CSV output
	var text = tweets[i].text;
	 text = text.replace(/"/g,'""');
	// text = text.replace(/,/g,'","');
	var newRow = 
		output.push ({
		  "status_id": tweets[i].id,
		  "time": tweets[i].timestamp,
		  "tweet_text": '"'+text+'"',
		  "faves": tweets[i].stats.faves,
		  "retweets": tweets[i].stats.retweets,
		  "replies": tweets[i].stats.replies,
		  "link": linkurl,
		  "clicks": linkclicks,
		  "reach": reach
		});
};
//Prep content for CSV export. *** FOR TEXT, must put quotes around to prevent CSV from delimiting at "real" commas!
var headers = '';
for (var i=0; i < properties.length; i++){
  headers = headers+properties[i]+',';
}
var rows = '';
for (var i=0; i < output.length; i++) {
	var newRow = '';
	for (var key in output[i]) {
		newRow = newRow+output[i][key]+',';
	}
	//Lop off last comma & replace with newline
	newRow = newRow.substring(0, newRow.length - 1);
	newRow = newRow+'\r\n';
	//Add the row to rows
	rows = rows+newRow;
}

//Lop off last comma
headers = headers.substring(0, headers.length - 1);

var csv = headers+'\r\n'+rows;

$('a').attr({
		href: 'data:application/csv,' + encodeURI(csv),	
		target: '_blank',
		download: 'twitter-export.csv'	
	});
};