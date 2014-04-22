var $ = require('jquery');
var getKeys = require('../scripts/getcheckboxes.js');
var simplifyTweets = require('../scripts/simplify-tweets.js');
var outputCSV = require('../scripts/output-csv.js');//allows download csv button to work. Button must have class download-csv
// MAIN.JS
//https://ads.twitter.com/accounts/xxxxxx/timeline_activity/tweet_data
$(document).ready(function() {
	//Get keys
	var keys;
	var friendlyNames;	
	$('#tweetkeys').find('input[type=checkbox]').bind('click', function() {
		if ($(this).attr('checked') == 'checked') {
			$(this).attr('checked',false);
		} else {
			$(this).attr('checked',true);
		}
		friendlyNames = getKeys('#tweetkeys','name');
		keys = getKeys('#tweetkeys','data-prop');
	});	
	//Get tweets by taking raw copy/pasted obj input and getting the array of objs inside
	var getTweetsArray = function (textarea) {
		var textareaValue = $(textarea).val();
		if (textareaValue.search('statuses')) {		
			return $.parseJSON(textareaValue).statuses;	
		}
	};	
		
	//Generate new filtered array of objs and print them out on screen
	var generate = function (tweets,keys) {	
		keys = getKeys('#tweetkeys','data-prop');
		var simpTweets = simplifyTweets(tweets, keys);
		$('.output-display, .csv-display').html('');//clear previous content
		$('.csv-display').text(outputCSV(simpTweets));
		$('.output-display').append(
			'<h1>'+friendlyNames+'</h1>'
		);
		for (var i=0; i < simpTweets.length; i++) {
			$('.output-display').append('<p>'+JSON.stringify(simpTweets[i], null, 4)+'</p><hr>');
		}		
	};	
		
	$('.generate-button').bind('click', function() {
		// ** Must regenerate tweet array, for case if the user dropped a key and now wants it back
		var tweets = getTweetsArray('.json-input');
		generate(tweets,keys);	
		var csv = outputCSV(tweets);
		console.log('tweets: '+tweets);
		//Activate Download CSV button	
		$('.download-csv').attr({
			href: 'data:application/csv,' + encodeURI(csv),	
			target: '_blank',
			download: 'twitter-export.csv'	
		});	
	});
	$('.download-csv').bind('click', function() {
		// ** Must regenerate tweet array, for case if the user dropped a key and now wants it back
		var simpTweets = simplifyTweets(getTweetsArray('.json-input'),keys);
		var csv = outputCSV(tweets);
		$('.csv-display').html('');//clear previous content
		
		//Activate Download CSV button	
		$('.download-csv').attr({
			href: 'data:application/csv,' + encodeURI(csv),	
			target: '_blank',
			download: 'twitter-export.csv'	
		});	
	});
});