//Takes an array of objects, a date range (string or array), and an object property that has a Unix timestamp in it
module.exports = function(objArray, range, unixTimeProp){
	var startTimestamp;
	var endTimestamp;
	if (typeof range == 'string') {
		endTimestamp = new Date();
		switch(range) {
			case('30 days'):
				break;
		};
	}
	// if (typeof range == 'array') {
	// }
	for (var i=0;i<objArray.length;i++) {
		while (objArray[i].timestamp > startTimestamp ) {
			
		}
	}
	return objArray;
};