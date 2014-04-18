var $ = require('jquery');
var getKeys = require('../scripts/getcheckboxes.js');
var filter = require('../scripts/filter.js');//function
//var outputCSV = require('../scripts/output-csv.js');//function
// MAIN.JS
//https://ads.twitter.com/accounts/xxxxxx/timeline_activity/tweet_data
$(document).ready(function() {
	//Get the JSON data
	var elem = $('.json-input');
	elem.data('oldVal', elem.val());
	var input;
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
	console.log(keys);
	elem.bind('propertychange keyup input paste',
		function(){
			input = $('.json-input').val();
			//validate
			if (input.search('statuses')) {		
				var tweets = $.parseJSON(input).statuses;	
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
		}
	);
});