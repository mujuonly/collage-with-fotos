(function(){

var parent = Sprite.prototype;

window.Shot = {
	Extends: parent,
	/**
	 * We shoot objects of this class
	 * @inherits Sprite
	 * @param {Scene} scene
	 * @param {TileActions} tileActions
	 * @alias Shot
	 */	
	init : function(options, scene, tileActions){
		// Call parent constructor
		parent.init.call(this, options);
		
		// ALL ATTRIBUTES ARE PRIVATE
		this._scene = scene;
		/**
		 * Reference to an object containing 
		 * methods for processing collition with
		 * enemies
		 */
		this._tileActions = tileActions;	
		/**
		 * Bounds which sprite can't leave {right,bottom}
		 */
		this._bounds = options.bounds;							
		/**
		 * Events {remove}
		 */
		this._e = options.events || {};
	},
	/**
	 * Updates shot position
	 * @alias Shot.prototype.update
	 */		
	update : function(){
		parent.update.call(this);

		if (this._top < 0){
			this._scene.remove(this);
			this._tileActions.hitShot(this);
			return;
		}
				
		// Check for wall collisions and bounce if needed
		this._bounce();
				
		// Collisions with tiles
		if (this._tileActions.isColliding(this)){
			this._scene.remove(this);
			this._tileActions.hitShot(this);			
		}
	},
	/**
	 * Removes el from dom
	 * @alias Shot.prototype.remove
	 */	
	remove : function(){
		// Execute user event
		if (this._e.remove){
			this._e.remove();
		}
		
		parent.remove.call(this);		
	},
	/**
	 * Checks if the sprite is inside playable area
	 * Changes direction of movement, so the shot can bounce of walls
	 * @alias Shot.prototype._bounce
	 */
	_bounce : function(){							
		if (this._left < 0 || this._left > this._bounds.right - this._width){
			this._angle = 180 - this._angle;	
		}
		
		if (this._top < 0 || this._top > this._bounds.bottom - this._height) {
			this._angle = 360 - this._angle;
		}
	}		
};

/**
 * These lines were added to make Aptana realize inheritance
 */
Shot.prototype = Sprite.prototype;
delete Shot.prototype;

/**
 * It's a hack. If we would use ClassName = vClass(ClassName)
 * Aptana would think that it is overwritten and the code
 * completion wouldn't work 
 */
window['Shot'] = vClass(Shot);

// close closure and execute it
})();