// The .bind method from Prototype.js 
Function.prototype.bind = function(){ 
  var fn = this, args = Array.prototype.slice.call(arguments), object = args.shift(); 
  return function(){ 
    return fn.apply(object, args); 
  }; 
};

/**
 * Function generates unique id
 */		
var getId = function(){
	var id = 0;
	return function(){
		return id++;
	}
}();