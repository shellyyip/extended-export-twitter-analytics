// ***********
// Module: json-order
// * Orders the properties in a JSON object to a desired order.
// * Takes an object and an array of properties in desired order.
module.exports = function(object,orderArray){
	var orderedObj = JSON.parse(JSON.stringify(object, orderArray));	
	return orderedObj;
};