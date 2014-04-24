//Takes an array of objects, a date range (string or array), and an object property that has a Unix timestamp in it
module.exports = function(objArray, range, property){
	var output = [];
	var startTimestamp;
	var endTimestamp;
	
	//if (range.length == 1) {//if range array is only one value
		var now = new Date();
		var endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());//today at beginning of day (00:00:00 or midnight)
		endTimestamp = endDate.getTime();//unix timestamp
		switch(range[0]) {
			case('30 Days'):
				startTimestamp = endTimestamp - 2592000000;
				break;
			case('60 Days'):
				startTimestamp = endTimestamp - 5184000000;
				break;
			case('90 Days'):
				startTimestamp = endTimestamp - 7776000000;
				break;
			default:
				//if all, just break and return original obj array
				return objArray;
		};
	//}
	// if (typeof range == 'array') {
	// }
	for (var i=0;i<objArray.length;i++) {
		var objTimestamp = objArray[i][property];
		if ( startTimestamp < objTimestamp && objTimestamp < endTimestamp ) {
			output.push(objArray[i]);
		}
	}
	return output;
};