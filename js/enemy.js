(function(){

var parent = Sprite.prototype;

window.Enemy = {
	Extends : parent, 
	/**
	 * Enemy - browsers that we will shoot
	 * @inherits Sprite
	 * @param {Scene} scene
	 * @alias Enemy
	 */	
	init : function(options, scene){
		// Call parent constructor
		parent.init.call(this, options);
		
		this._scene = scene;
		/**
		 * Bounds which sprite can't leave {right,bottom}
		 */
		this._bounds = options.bounds;		
	},
	/**
	 * Updates tile position
	 * @alias Enemy.prototype.update
	 */		
	update : function(){
		parent.update.call(this);
		
		// Check for wall collisions and bounce if needed
		this._bounce();
	},	
	/**
	 * Shows nice animation and removes el from dom
	 * @alias Enemy.prototype.remove
	 */	
	remove : function(){
		parent.remove.call(this);
		//console.log('show nice animation');
	},
	/**
	 * Checks if the sprite is inside playable area
	 * Changes direction of movement, so the shot can bounce of walls
	 * @alias Enemy.prototype._bounce
	 */
	_bounce : function(){				
		if (this._left < 0 || this._left > this._bounds.right - this._width){
			this._angle = 180 - this._angle;	
		}
		
		if (this._top > this._bounds.bottom - this._height) {
			this._scene.remove(this);
		}
	}		
};

/**
 * These lines were added to make Aptana realize inheritance
 */
Enemy.prototype = Sprite.prototype;
delete Enemy.prototype;

/**
 * It's a hack. If we would use ClassName = vClass(ClassName)
 * Aptana would think that it is overwritten and the code
 * completion wouldn't work 
 */
window['Enemy'] = vClass(Enemy);

// close closure and execute it
})();