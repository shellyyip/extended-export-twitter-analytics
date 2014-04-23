// elem = HTML container of checkboxes
// attr = desired checkbox attribute to collect
// Returns an array of the attribute values of the checked checkboxes.
module.exports = function(elem,attr){
	var output = [];
	//only get checkboxes with requested attribute that have property checked = true
	var checkboxes = $(elem).find('input[type=checkbox]['+attr+']');	
	checkboxes.each(function() {
		if (this.checked == true) {
			var item = $(this).attr(attr);//get value of desired attribute
			output.push(item);
		}
	});
	return output;
};