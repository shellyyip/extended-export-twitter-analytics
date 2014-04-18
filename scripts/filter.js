//Filters original array of obejcts into a new curated array of JSON.
//Input & output = array of JSON objs
module.exports = function(input, properties){
	var output = [];//array of objects	
	//check properties (array of keys user wants to filter to)
		//does it just say "all?"
		//skip all this jank and return the original JSON raw	
	function filterKeys(obj,keysArray) { 
	  	for (var key in obj) {
	    	if (typeof obj[key] == "object" && $.inArray(key, keysArray) != -1) {
	    		//if this is a nesting key but we want to keep everything inside
	    		continue;
	    	} else if (typeof obj[key] == "object") {
			    //search the keys of this key's object
			    filterKeys(obj[key],keysArray);     
		    } else {
		      if ($.inArray(key, keysArray) == -1) {
		        //drop that sucka
		        delete obj[key];
		      }
		    }
		}
		return obj;
	}	
	//Loop through & filterKeys each member of raw array
	for (var i = 0; i < input.length; i++) {
		var obj = input[i];
		filterKeys(obj,properties);	
		output.push(obj);	
	}	
	return output;
};