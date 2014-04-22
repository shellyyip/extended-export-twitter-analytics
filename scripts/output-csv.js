// *********
// ** Takes an array of SIMPLE json objects and returns a CSV.
// ** Objects must NOT have any nested keys
// ** This function also assumes that every object has the same keys, even if their value is empty.

var objArray = require('../scripts/simplify-tweets.js');//function

module.exports = function(objArray){
	//Create array of desired properties using first object in array
	var properties = [];
	for (key in objArray[0]) {
		properties.push(key);
	}
	// // //process text for CSV output
	// // var text = tweets[i].text;
	 // // text = text.replace(/"/g,'""');
	// // //convert time
	// // var time = new Date(tweets[i].timestamp);
	// // // text = text.replace(/,/g,'","');

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
			value = value.replace(/"/g,'""');
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