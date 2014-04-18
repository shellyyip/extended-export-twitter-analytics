var $ = require('jquery');
var getKeys = require('../scripts/getcheckboxes.js');
var filter = require('../scripts/filter.js');//function
//var outputCSV = require('../scripts/output-csv.js');//function
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
		console.log(keys);
	});
	
	//Get tweets by taking raw copy/pasted obj input and getting the array of objs inside
	function getTweetsArray(textarea) {
		var textareaValue = $(textarea).val();
		if (textareaValue.search('statuses')) {		
			return $.parseJSON(textareaValue).statuses;	
		}
	}
	
	//Get the JSON data
	function generate(tweets,keys) {	
		keys = getKeys('#tweetkeys','data-prop');
		console.log(keys);
		var jsonOutput = filter(tweets, keys);	
		console.log(jsonOutput);
		$('.output-display').text(JSON.stringify(jsonOutput));
		$('.output-display').append(
			'<h1>'+friendlyNames+'</h1>'
		);
		for (var i=0; i < jsonOutput.length; i++) {
			$('.output-display').append('<p>'+JSON.stringify(jsonOutput[i], null, 4)+'</p><hr>');
		}		
	}		
	
	$('.generate').bind('click', function() {
		// ** Must regenerate tweet array, for case if the user dropped a key and now wants it back
		var tweets = getTweetsArray('.json-input')
		generate(tweets,keys);
	});
});