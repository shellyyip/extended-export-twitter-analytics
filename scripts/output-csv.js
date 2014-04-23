// *********
// ** Takes an array of SIMPLE json objects and returns a CSV.
// ** Objects must NOT have any nested keys
// ** To get CSV headers, search for the object with the most keys, and extract its keys for headers

var objArray = require('../scripts/simplify-tweets.js');//function

module.exports = function(objArray){
	//Create array of desired properties using largest object in array
	var properties = [];
	//Find object in array with most keys
	var findBiggestObjIndex = function(objArray) {
		var biggestIndex;
	    var leader = 0;
			for (var i=0;i<objArray.length;i++) {
				//count keys in current object
	       var newCount = 0;
				for(key in objArray[i]) {
				  if(objArray[i].hasOwnProperty(key)) {//if a key exists
				    newCount++;
				  }
				}	
	      if (newCount > leader) {
	        biggestIndex = i;
	        leader = newCount;
	      }
	    }
	    return biggestIndex;    
	};
	
	for (key in objArray[findBiggestObjIndex(objArray)]) {
		properties.push(key);
	}
	// // //process text for CSV output
	// // var text = tweets[i].text;
	 // // text = text.replace(/"/g,'""');
	// // //convert time
	// // var time = new Date(tweets[i].timestamp);
	// // // text = text.replace(/,/g,'","');
	
var escapify = function(string) {
	string = string.replace(/"/g,'""');
	//string = string.replace(/,/g,'","');
	string = '"' + string + '"';
	return string;
};

//Prep content for CSV export. *** FOR TEXT, must put quotes around to prevent CSV from delimiting at "real" commas!
var headers = '';
for (var i=0; i < properties.length; i++){
  headers = headers+properties[i]+',';
}
var rows = '';
for (var i=0; i < objArray.length; i++) {
	var newRow = '';
	for (var key in objArray[i]) {
		var value = objArray[i][key];
		if (typeof value == 'string') {			
			value = escapify(value);
		}
		newRow = newRow + value + ',';
	}
	//Lop off last comma & replace with newline
	newRow = newRow.substring(0, newRow.length - 1);
	newRow = newRow+'\r\n';
	//Add the row to rows
	rows = rows+newRow;
}

//Lop off last comma
headers = headers.substring(0, headers.length - 1);

var csv = headers+'\r\n'+rows;
return csv;
};