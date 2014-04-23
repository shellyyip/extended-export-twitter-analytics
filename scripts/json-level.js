// ***********
// Module: json-level
// * Takes an array of objects who don't all have the same properties, and adds the missing properties with empty values, so at the end all objects have the same props.
// * This assumes all objects in array are SIMPLIFIED; ie. NOT NESTED, no objects for values.
// * Outputs an array of objects.
module.exports = function(objArray){
	// var findBiggestObjIndex = function(objArray) {
		// var biggestIndex;
	    // var leader = 0;
			// for (var i=0;i<objArray.length;i++) {
				// //count keys in current object
	       // var newCount = 0;
				// for(key in objArray[i]) {
				  // if(objArray[i].hasOwnProperty(key)) {//if a key exists
				    // newCount++;
				  // }
				// }	
	      // if (newCount > leader) {
	        // biggestIndex = i;
	        // leader = newCount;
	      // }
	    // }
	    // return biggestIndex;    
	// };
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
	var leveledObjs = [];
	// Loop through each obj in array AGAIN
	for (var i=0;i<objArray.length;i++) {
		  // // get props for each object
		  // var props = [];
		  // for (key in objArray[i]) {
		    // props.push(key);   
		  // }
		  // find differences between obj's props and needed props
		  //Loop through each key in needed props
		  for (var j=0;j<neededProps.length;j++) {
		  	console.log(neededProps[j]);
		  	console.log(objArray[i].hasOwnProperty(neededProps[j]));
		  		if (objArray[i].hasOwnProperty(neededProps[j]) == false) {//if neededKey in object
		  			//add the neededProp with empty string value
		  			objArray[i][neededProps[j]] = '';
		  		}
		  }
		  
		  // var diff = $(neededProps).not(props).get();//array
		  // //loop through diff array and add each index as key with empty string value to obj
		  // for (var j=0;j<diff.length;j++) {
		     // objArray[i][diff[j]] = '';
		  // }
		  //then push leveled object to new array
		  leveledObjs.push(objArray[i]);
	}
	return leveledObjs;
	};