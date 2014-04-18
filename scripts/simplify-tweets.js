var filter = require('../scripts/filter.js');
// **** SIMPLIFY-TWEETS.JS
// * Filters raw tweet array to desired keys, then returns a simplified, remapped array of tweets
// INPUT: array of standard tweet objects (formatted like their API), array of obj of desired properties, optimally mapped as prop:friendlyName
// OUTPUT: totally simplified tweet objects in array, formatted as friendlyName: propValue
module.exports = function(rawArray, keysArray){
	
	function findDisplayUrl(rawURL, entitiesObj) {
		return 'boop';
	}
	
	//Save copy of raw array for special cases
	var originArray = $.extend(true, [], rawArray);	
	//Get filtered tweet array
	var tweetsArray = filter(rawArray, keysArray);
	var output = [];
	//loop through tweets and remap
	for (var i=0; i < tweetsArray.length; i++) {
		var newObj = {};
		var tweet = tweetsArray[i];	
		for (var key in keysArray) {
			switch(keysArray[key]) {
				//catch all special cases, like links
				case 'links':
					var j = 1;
					var rawEntities = originArray[i].entities;
					for (linkKey in tweet.links) {
						//linkKey is minified twitter URL
						newObj['*TEST*_'+j] = linkKey;
						//if media_url == linkKey
							//return entities.media.display_url
						//if
						newObj['*FN-RETURN* '+j] = findDisplayUrl(linkKey, rawEntities)
						newObj['link '+j] = rawEntities;
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
	return output;
};