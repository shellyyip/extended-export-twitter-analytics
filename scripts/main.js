var $ = require('jquery');
var filter = require('../scripts/filter.js');//function
var outputCSV = require('../scripts/output-csv.js');//function

//https://ads.twitter.com/accounts/xxxxxx/timeline_activity/tweet_data
$(document).ready(function() {
	//Get the JSON data
	var elem = $('.json-input');
	elem.data('oldVal', elem.val());
	var input;
	var properties = ["status_id","time","tweet_text","faves","retweets","replies","link","picture","clicks","reach"];
	elem.bind('propertychange keyup input paste',
		function(){
			input = $('.json-input').val();
			//validate
			if (input.search('statuses')) {		
				var tweets = $.parseJSON(input).statuses;	
				var jsonOutput = filter(tweets, properties);	
				outputCSV(tweets);		
				$('.output-display').text(jsonOutput);
			}		
		}
	);
});