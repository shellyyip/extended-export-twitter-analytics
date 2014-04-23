var $ = require('../scripts/lib/jquery-2.1.0.min.js');
var getKeys = require('../scripts/getcheckboxes.js');//gather array of checked checkboxes
var simplifyTweets = require('../scripts/simplify-tweets.js');
var outputCSV = require('../scripts/output-csv.js');//allows download csv button to work. Button must have class download-csv
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
		console.log(keys);
		var tweets = getTweetsArray('.json-input');
		var simpTweets = simplifyTweets(tweets, keys);
		var csv = outputCSV(simpTweets);
		//Output data onto screen
		$('.output-display, .csv-display').html('');//clear previous content
		$('.csv-display').text(csv);
		$('.output-display').append(
			'<h1>'+keys+'</h1>'
		);
		for (var i=0; i < simpTweets.length; i++) {
			$('.output-display').append('<p>'+JSON.stringify(simpTweets[i], null, 4)+'</p><hr>');
		}
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
	// $('.download-csv').bind('click', function() {
		// // ** Must regenerate tweet array, for case if the user dropped a key and now wants it back
		// var simpTweets = simplifyTweets(getTweetsArray('.json-input'),keys);
		// var csv = outputCSV(tweets);
		// $('.csv-display').html('');//clear previous content
	// });
});