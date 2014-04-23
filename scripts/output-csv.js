// *********
// ** Takes an array of SIMPLE json objects and returns a CSV.
// ** Objects must NOT have any nested keys
// ** Objects must all have the same keys too (with empty values if needed); if not, use json-level
// ** Fetch CSV headers from first object (again, because we're assuming all objs have same keys)

var objArray = require('../scripts/simplify-tweets.js');//function

module.exports = function(objArray){
	//Create array of desired properties using largest object in array
	var properties = [];
	for (key in objArray[0]) {
		properties.push(key);
	}
	// // var time = new Date(tweets[i].timestamp);
	
var escapify = function(string) {
	string = string.replace(/"/g,'""');
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