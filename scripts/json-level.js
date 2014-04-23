var order = require('../scripts/json-order.js');
// ***********
// Module: json-level
// * Takes an array of objects who don't all have the same properties, and adds the missing properties with empty values, so at the end all objects have the same props.
// * This assumes all objects in array are SIMPLIFIED; ie. NOT NESTED, no objects for values.
// * Outputs an array of objects.
module.exports = function(objArray){
	var collectProps = function(objArray) {
	  var props = [];
	  // loop through each obj in array
	  for (var i=0;i<objArray.length;i++) {
	    // for each obj, go through each prop
	    for(key in objArray[i]) {
	      if(objArray[i].hasOwnProperty(key)) {//if a key exists
	        // if prop is NOT in props array, add it
	        if ($.inArray(key, props) == -1) {
	          props.push(key);	
	        }
	      }
	    }
	  }
	  return props;
	};
	
	var neededProps = collectProps(objArray);
	console.log(neededProps);
	var leveledObjs = [];
	// Loop through each obj in array AGAIN	
	for (var i=0;i<objArray.length;i++) {
		var object = objArray[i];
		  //Loop through each key in needed props
		  for (var j=0;j<neededProps.length;j++) {
		  		//if neededKey in not object
		  		if (object.hasOwnProperty(neededProps[j]) == false) {
		  			//add the neededProp with empty string value
		  			object[neededProps[j]] = '';
		  		}
		  }
		  //puts props in order
		  object = order(object,neededProps);
		  //then push leveled object to new array
		  leveledObjs.push(object);
	}
	return leveledObjs;
};