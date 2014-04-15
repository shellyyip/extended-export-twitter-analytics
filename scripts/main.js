var $ = require('jquery');
var filter = require('../scripts/filter.js');//function

//https://ads.twitter.com/accounts/xxxxxx/timeline_activity/tweet_data
$(document).ready(function() {
	//Get the JSON data
	var elem = $('.json-input');
	elem.data('oldVal', elem.val());
	var input;
	elem.bind('propertychange keyup input paste',
		function(){
			input = $('.json-input').val();
			//validate
			if (input.search('statuses')) {		
				var tweets = $.parseJSON(input).statuses;	
				filter(tweets);			
			}		
		}
	);
});