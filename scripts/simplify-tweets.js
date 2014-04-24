var levelOut = require('../scripts/json-level.js');
var getOptions = require('../scripts/getcheckboxes.js');
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

	var output = [];
	//loop through tweets and remap
	for (var i=0; i < rawArray.length; i++) {
		var newObj = {};
		var tweet = rawArray[i];
		// Twitter Simplification
		//** Special separate Date/Time Processing
		var dateOptions = getOptions('#datetime-formats','data-option');
		var unixTime = tweet.timestamp;
		var dateObj = new Date(unixTime);
		var year = dateObj.getFullYear();
		var month = dateObj.getMonth();
		var day = dateObj.getDate();
		
		//** Other props
		var sponsoredInfo = tweet.sponsored_info;		
		for (var key in keysArray) {
			switch(keysArray[key]) {//catch all tweet properties that need special processing			
				case 'timestamp':
					for (index in dateOptions) {
						switch(dateOptions[index]) {
							case 'unix-timestamp':
								newObj['UNIX timestamp'] = unixTime;
								break;
							case 'iso-timestamp':
								newObj['ISO timestamp'] = dateObj;
								break;
							case 'iso-date':
								newObj['ISO Date'] = year + '-' + month + '-' + day;
								break;
							case 'MM/DD/YYYY':
								newObj['Date'] = month+'/'+day+'/'+year;
								break;
								
						}
					}
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
				// *** The Badges group
				case 'reach':
					var reach = tweet.badges.reach;
					if (reach != undefined) {
						newObj['reach multiplier'] = reach;
					} else {
						newObj['reach multiplier'] = '';
					}
					break;
				// *** Sponsorship Info
				case 'sponsored_info': 
					if (sponsoredInfo == null) {
						newObj['sponsored start'] = '';
						newObj['sponsored end'] = '';
					} else {
						newObj['sponsored start'] = sponsoredInfo.start;
						newObj['sponsored end'] = sponsoredInfo.end;
					}
					break;
				case 'campaigns': 
					if (sponsoredInfo != null) {
						var campaignArray = sponsoredInfo.campaigns;
						var campaignValue = '';
						for (var c=0;c<campaignArray.length;c++) {
							campaignValue = campaignValue+campaignArray[c].name+', ';
						}
						//lop off last space and comma
						campaignValue = campaignValue.substring(0, campaignValue.length - 2);
						newObj['campaigns'] = campaignValue;
					}
					break;
				// *** The Entities group
				case 'mentions': 
					var mentionsArray = tweet.entities.mentions;
					var mentionsValue = '';
					for (var m=0;m<mentionsArray.length;m++) {
						mentionsValue = mentionsValue + mentionsArray[m].screen_name+', ';
					}
					//lop off last space and comma
					mentionsValue = mentionsValue.substring(0, mentionsValue.length - 2);
					newObj['mentions'] = mentionsValue;
					break;
				case 'links':
					var j = 1;
					var rawEntities = tweet.entities;
					for (linkKey in tweet.links) {
						//linkKey is minified twitter URL
						newObj['link_'+j] = findFullUrl(linkKey, rawEntities);			
						newObj['click count '+j] = tweet.links[linkKey];
						j++
					}
					break;
				case 'hashtags': 
					var hashtagsArray = tweet.entities.hashtags;
					var hashtagsValue = '';
					for (var h=0;h<hashtagsArray.length;h++) {
						hashtagsValue = hashtagsValue + hashtagsArray[h].text+', ';
					}
					//lop off last space and comma
					hashtagsValue = hashtagsValue.substring(0, hashtagsValue.length - 2);
					newObj['hashtags'] = hashtagsValue;
					break;
				default:
					//regular remap;
					newObj[keysArray[key]] = tweet[keysArray[key]];
					
			}
		}
		output.push(newObj);
	}
	// * Need to replace undefined with empty strings
	output = levelOut(output);//For looping keys such as link 1, link 2, etc., not all tweet objs will have these properties. levelOut adds these props with empty string value so CSV processing will be happier.

	return output;
};