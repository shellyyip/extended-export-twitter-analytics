var $ = require('../scripts/lib/jquery-2.1.0.min.js');
var getKeys = require('../scripts/getcheckboxes.js');//gather array of checked checkboxes
var simplifyTweets = require('../scripts/simplify-tweets.js');
var outputCSV = require('../scripts/output-csv.js');//allows download csv button to work. Button must have class download-csv
var outputHTMLTable = require('../scripts/output-htmltable.js');
var filterDateRange = require('../scripts/objarray-filterdate.js');
// MAIN.JS
//https://ads.twitter.com/accounts/xxxxxx/timeline_activity/tweet_data
$(document).ready(function() {
	//elem = check all button element
	var checkAll = function(elem) {
		$(elem).bind('click', function() {
			$('#tweetkeys').find('input[type=checkbox]').prop('checked',true);
		});
	};
	var uncheckAll = function(elem) {
		$(elem).bind('click', function() {
			$('#tweetkeys').find('input[type=checkbox]').prop('checked',false);
		});
	};
	checkAll('[data-onclick=checkAll]');
	uncheckAll('[data-onclick=uncheckAll]');
	
	//Get tweets by taking raw copy/pasted obj input and getting the array of objs inside
	var getTweetsArray = function (textarea) {
		var textareaValue = $(textarea).val();
		if (textareaValue.search('statuses')) {		
			return $.parseJSON(textareaValue).statuses;	
		}
	};	
		
	//Generate new filtered array of objs and print them out on screen
	var generate = function () {	
		var keys = getKeys('#tweetkeys','data-prop');
		var dateRange = getKeys('#daterange','data-daterange');
		var tweets = getTweetsArray('.json-input');
		tweets = filterDateRange(tweets,dateRange,timestamp);
		var simpTweets = simplifyTweets(tweets, keys);
		var csv = outputCSV(simpTweets);
		//Output data onto screen
		outputHTMLTable(simpTweets,'.output-display');
		//Activate CSV download
		$('.download-csv').attr({
			href: 'data:application/csv,' + encodeURI(csv),	
			target: '_blank',
			download: 'twitter-export.csv'	
		});				
	};	
		
	$('.generate-button').bind('click', function() {
		generate();	
	});
});