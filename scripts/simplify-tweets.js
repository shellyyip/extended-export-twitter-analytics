var levelOut = require('../scripts/json-level.js');
// **** SIMPLIFY-TWEETS.JS
// * Filters raw tweet array to desired keys, then returns a simplified, remapped array of tweets using friendly names
// INPUT: array of standard tweet objects (formatted like their API), array of obj of desired properties, optimally mapped as prop:friendlyName
// OUTPUT: totally simplified tweet objects in array, formatted as friendlyName: propValue
// Note to self: convert timestamp to datetime via new Date(timestamp);
module.exports = function(rawArray, keysArray){
	
	var findFullUrl = function (rawURL, entitiesObj) {
	//this function DOES NOT assume that the rawURL is a media or URL object!
		var urlsArray = entitiesObj.urls;
		var mediaArray = entitiesObj.media;
		var urlsLength = urlsArray.length;
		var mediaLength = mediaArray.length;
		//search urls array
		for (var i=0; i < urlsLength; i++) {
		  if (urlsArray[i].url == rawURL) {
		  	return urlsArray[i].expanded;
		  }
		}		
			//search media array
			for (var j=0; j < mediaLength; j++) {
			  if (mediaArray[j].url == rawURL) {
			  	return mediaArray[j].expanded_url;
			  }
			}
		return '';
	};
	
	//Save copy of raw array for special cases
	//var originArray = $.extend(true, [], rawArray);	
	//Get filtered tweet array
	//var tweetsArray = rawArray;
	var output = [];
	//loop through tweets and remap
	for (var i=0; i < rawArray.length; i++) {
		var newObj = {};
		var tweet = rawArray[i];
		var unixTime = tweet.timestamp;
		var dateObj = new Date(unixTime);	
		for (var key in keysArray) {
			switch(keysArray[key]) {
				//catch all tweet properties that need special processing
				// *** Date/Time
				case 'timestamp':
					newObj['Unix timestamp'] = tweet.timestamp;
					newObj['ISO timestamp'] = dateObj;
					//switch cases for date/time options
						// case 'timestamp-iso':
						// newObj['ISO timestamp'] = dateObj;
						// // var year = dateObj.getFullYear();
						// // var month = dateObj.getMonth();
						// // var day = dateObj.getDate();
						// // newObj['date'] = year + '-' + month + '-' + day;
						// //newObj['time'] = 05:26:10;
						// break;
					break;
				// *** The Stats group
				case 'retweets':
					newObj['retweets'] = tweet.stats.retweets;
					break;
				case 'faves':
					newObj['faves'] = tweet.stats.faves;
					break;
				case 'replies':
					newObj['replies'] = tweet.stats.replies;
					break;
				// *** The Entities group
				case 'links':
					var j = 1;
					var rawEntities = tweet.entities;
					for (linkKey in tweet.links) {
						//linkKey is minified twitter URL
						newObj['link '+j] = findFullUrl(linkKey, rawEntities);			
						newObj['click count '+j] = tweet.links[linkKey];
						j++
					}
					break;
				default:
					//regular remap;
					newObj[keysArray[key]] = tweet[keysArray[key]];
					
			}
		}
		output.push(newObj);
	}
	// * Need to replace undefined with empty strings
	output = levelOut(output);//adds props with empty vals so all objs have same props (ie. link 2, link 3, etc.). This is for easier CSV processing.

	return output;
};