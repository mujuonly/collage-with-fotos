(function(){

window.Scene = {
	/**
	 * Scene class that contains all game objects,
	 * and is responsible for rendering and animation
	 * @alias Scene
	 */
	init : function(options){
		// ALL ATTRIBUTES ARE PRIVATE
		/**
		 * Parent element for sprites
		 */ 
		this.el = options.el;
		this.size = {
			width: this.el.width(),
			height: this.el.height()
		};
		
		/**
		 *  All objects that need to be updated
		 */
		this.objs = [];
		
		/**
		 * Current index for iterations, to fix bug when
		 * we iterated over removed items
		 */
		this.current = 0;

		// cycle update each sprite
		this.updateInt = setInterval(this.update.bind(this), 20);
		
		// cycle draw each sprite
		this.drawInt = setInterval(this.draw.bind(this), 35);			
	},
	/**
	 * Stops scene from being updated
	 * @alias Scene.prototype.stop
	 */		
	stop : function(){
		clearInterval(this.updateInt);
		clearInterval(this.drawInt);
	},
	/**
	 * Returns scene element
	 * @alias Scene.prototype.getEl
	 */	
	getEl : function(){
		return this.el;
	},	
	/**
	 * Returns scene size
	 * @alias Scene.prototype.getSize
	 */	
	getSize : function(){
		return this.size;
	},
	/**
	 * Returns array containing all game objects
	 * @alias Scene.prototype.get
	 */
	get : function(){
		return this.objs;
	},
	/**
	 * Adds object to the scene 
	 * @alias Scene.prototype.register
	 */	
	register : function(obj){
		this.objs.push(obj);		
	},
	/**
	 * Removes object from scene
	 * @param {Object} obj to remove
	 * @alias Scene.prototype.remove
	 */	
	remove : function(obj){
		// remove method
		if (obj.remove) obj.remove();
			
		var i = this.objs.length;						
		while (i--){
			if (this.objs[i] === obj){
				// Remove object from array
				this.objs.splice(i, 1);
				
				if (i < this._current){
					this.current--;
				}
				
				break;				
			}
		}
	},	
	/**
	 * Updates all objects
	 * @private
	 */
	update : function(){		 
		// We use this strange costruct
		// to evade problems when obj.update
		// would call remove, and in the end
		// we would update undefined elements
		for (this.current = 0; this.current < this.objs.length; this.current++){
			this.objs[this.current].update();
		}
	},
	/**
	 * Draws all objects
	 * @private
	 */
	draw : function(){
		// We use this strange costruct
		// to evade problems when obj.update
		// would call remove, and in the end
		// we would update undefined elements
		for (this.current = 0; this.current < this.objs.length; this.current++){
			this.objs[this.current].draw();
		}
	}
};

/**
 * It's a hack. If we would use ClassName = vClass(ClassName)
 * Aptana would think that it is overwritten and the code
 * completion wouldn't work 
 */
window['Scene'] = vClass(Scene);

// close closure and execute it
})();