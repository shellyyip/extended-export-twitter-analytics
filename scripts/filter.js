//Filters original array of obejcts into a new curated array of JSON.
module.exports = function(jsonRaw, properties){
	var jsonOutput = [];//array of objects	
	
	//check properties (array of keys user wants to filter to)
		//does it just say "all?"
		//skip all this jank and return the original JSON raw
	
	function filterKeys(obj,keysArray) {
		for (var key in obj) {
			//if key not in keysArray
			if ($.inArray(key, keysArray) != -1) {
				//drop that sucka
				delete obj[key];
				//return obj
			};
			return obj;
		}
	}
	
	//Loop through & filterKeys each member of raw array
	for (var i = 0; i < jsonRaw.length; i++) {
		var obj = jsonRaw[i];
		filterKeys(obj,properties);
		
	}	
	return jsonOutput;
};