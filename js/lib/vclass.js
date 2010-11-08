/**
 * Creates a class from supplied object literal.
 * @return {Function} Returns a class
 */
function vClass(obj){
  // Create a base function for our new class that
  // will execute initializing method
  var newClass = function(realArgs){		
	// These lines allow us to use constructor without "new"
	// Taken from ejohn.org/blog/simple-class-instantiation/
	if ( !(this instanceof arguments.callee)){
		return new newClass(arguments);
	}

    if (this.init){
		this.init.apply(this, realArgs && realArgs.callee ? realArgs : arguments);
	}
  };
  
  // Empty function that will serve as prototype
  // containing class methods        
  var proto = function(){};  

  // link to parent prototype
  if (obj.Extends){
  	proto.prototype = obj.Extends;
	// we don't need it anymore
	delete obj.Extends;
  }
  
  // complete prototyping chain
  // parentClass.prototype -> methods -> Class
  newClass.prototype = new proto;
  
  // fix the constructor    
  newClass.prototype.constructor = newClass;
  
  // Copy methods and propertions to the prototype
  for (var prop in obj) {
    newClass.prototype[prop] = obj[prop];
  }
  
  // Fix IE that doesn't iterate through non-enumerable properties 
  // when using for in loop
  var nonEnum = ["toString", "toLocaleString", "isPrototypeOf", "propertyIsEnumerable", "hasOwnProperty", "valueOf"], prop;
  
  while (prop = nonEnum.pop()) {
    if (obj.hasOwnProperty(prop)) {
      newClass.prototype[prop] = obj[prop];
    }
  }  
  
  return newClass;  
}