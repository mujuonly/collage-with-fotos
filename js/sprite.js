(function(){

window.Sprite = {
	/**
	 * It's a basic class for a moving object
	 * @alias Sprite
	 */
	init : function(options){
		// ALL ATTRIBUTES ARE PRIVATE
		// Coordinates of the images top-left point
		this._left = options.left;
		this._top = options.top;		

		// Point where sprite is actually displayed
		this._drawnLeft;
		this._drawnTop;
				
		// (bool) is this Sprite is ellipse shape
		// for collision detection
		this._ellipse = options.ellipse || false;		
		
		// Dimentions of the image		
		this._width = options.width;
		this._height = options.height;
		
		// Direction & speed
		this._angle = options.angle || 0;
		this._speed = options.speed || 0;
				
		// Type of the browser
		this._type = options.type;
				
		// Image src
		this._src = options.src || 'images/mini/' + this._type  + '.png';		
		this._el = $('<img />')
			.attr('src', this._src)
			.css({
				position: 'absolute',
				left: this._left,
				top: this._top,
				width: this._width,
				height: this._height
			})
			.appendTo(options.parent || 'body');			
	},
	/**
	 * Updates Sprite position, for animation
	 * @alias Sprite.prototype.update
	 */
	update : function(){
		// uses angle and speed to calculate change in position 
		this._left = this._left + this._speed * Math.cos(this._angle * Math.PI/180);
		this._top = this._top - this._speed * Math.sin(this._angle * Math.PI/180);
	},
	/**
	 * Draws Sprite on Scene
	 * @alias Sprite.prototype.draw
	 */ 
	draw : function(){
		var style = this._el[0].style;
		var left = Math.round(this._left);
		var top = Math.round(this._top);
		
		// Only redraw if the image was moved
		if (this._drawnLeft != left) {
			style.left = left + 'px';
		}
		
		// Only redraw if the image was moved
		if (this._drawnTop != top) {
			style.top = top + 'px';	
		}		
		
		this._drawnLeft = left;
		this._drawnTop = top;
	},
	/**
	 * Removes el from dom
	 * @alias Sprite.prototype.remove
	 */
	remove : function(){
		this._el.hide();
		this._el = null;
	},
	/**
	 * Checks if sprite collide with another one
	 * @param {Sprite} sprite
	 * @alias Sprite.prototype.collide
	 */		
	collide : function(sprite){
		if (this._ellipse && sprite._ellipse)
		{
			var yGap = Math.abs(this._top + this._height/2 - (sprite._top + sprite._height/2));
			var xGap = Math.abs(this._left + this._width/2 - (sprite._left + sprite._width/2));
			
			var gap = Math.sqrt(yGap * yGap + xGap * xGap);
			
			if (gap <= this._height/2 + sprite._height/2){
				return true;
			}			
		}
		else if (this._left < sprite._left + sprite._width &&
			this._left + this._width > sprite._left &&
			this._top < sprite._top + sprite._height &&
			this._top + this._height > sprite._top){				
			
			// Box collitions	
			return true;
		}
		return false;
	},			
	/**
	 * Returns object containing top, left 
	 * @alias Sprite.prototype.getPosition
	 */	
	getPosition: function(){
		return {left:this._left, top: this._top};
	},	
	/**
	 * Move Sprite to specified position 
	 * @param {Object} contains top, left 
	 * @alias Sprite.prototype.moveTo
	 */
	setPosition : function(position){
		if (position.left){
			this._left = position.left;
		}
		
		if (position.top){
			this._top = position.top;
		}		
	},
	/**
	 * Sets speed and direction for sprite
	 * @param {Number} speed
	 * @param {Number} angle in grads 0 = right
	 * @alias Sprite.prototype.setSpeed
	 */
	setSpeed : function(speed , angle){
		this._speed = speed;
		
		if (angle != null){
			this._angle = angle;
		}		
	},
	/**
	 * Returns sprite type
	 * @alias Sprite.prototype.getType
	 */
	getType : function(){
		return this._type;
	}
}; 

/**
 * It's a hack. If we would use ClassName = vClass(ClassName)
 * Aptana would think that it is overwritten and the code
 * completion wouldn't work 
 */
window['Sprite'] = vClass(Sprite);


// close closure and execute it
})();