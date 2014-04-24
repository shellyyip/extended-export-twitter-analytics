
module.exports = function(objArray,elem){
	elem = $(elem);
	//Make headers
	var properties = [];
	for (key in objArray[0]) {
		properties.push(key);
	}
	var headers = '';
	for (var i=0; i < properties.length; i++){
	  headers = headers+'<td>'+properties[i]+'</td>';
	}
	headers = '<tr>'+headers+'</tr>';
	//Rows
	var rows = '';
	for (var i=0; i < objArray.length; i++) {
		var newRow = '';
		for (var key in objArray[i]) {
			var value = objArray[i][key];
			newRow = newRow +'<td>'+ value +'</td>';
		}
		newRow = '<tr>'+newRow+'</tr>';
		//Add the row to rows
		rows = rows+newRow;
	}
	//Put it all together
	elem.html('<table>'
				+headers+rows+
			  '</table>');
};