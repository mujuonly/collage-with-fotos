(function(){

Cannon = {
	/**
	 * Creates a Cannon instance
	 * @param {Scene} scene
	 * @param {TileFactory} tileFactory
	 * @alias Cannon 
	 */
	init : function(scene, shotFactory){
		this.shotFactory = shotFactory;						
		/**
		 * Shot that we will create later
		 */
		this.shot = null;		
		/**
		 * Arrow angle relative to default
		 */
		this.rotation = 0;		
		/**
		 * Arrow moving speed degrees per update
		 */
		this.speed = 3;		
		/**
		 * Arrow element
		 */		
		this.el = $('.cannon');
		this.el.css('transformOrigin', 'center bottom');
		this.useCanvas = true;
		
		if (this.el[0].filters){
			this.useCanvas = false;
			this.el[0].style.filter = "progid:DXImageTransform.Microsoft.Matrix(sizingMethod='auto expand')";
		} else {
			this.ctx = $('.cannon canvas')[0].getContext('2d');
			this.ctx.translate(100, 0);			
			this.img = new Image();
			this.img.src = 'images/cannon.png';
			this.el[0].style.background = "none";
		}
		
		this.reload();		
		$('body').mousedown(this.shoot.bind(this));		
	},
	/**
	 * Updates angle for shooting
	 * @alias Cannon.prototype.update
	 */
	update : function(){
		this.rotation += this.speed;
		
		if (Math.abs(this.rotation) > 80){
			this.speed = -this.speed;
		}				
	},
	/**
	 * Draws the arrow
	 * @alias Cannon.prototype.draw
	 */
	draw : function(){
		if (this.useCanvas){
			if ( ! this.img.complete){
				return;
			}	
			
			this.ctx.clearRect(-50,0,250,50);
			
			this.ctx.save();		
			this.ctx.translate(4.5, 50);
			this.ctx.rotate(this.rotation * Math.PI / 180);
			this.ctx.drawImage(this.img, -4.5, -50, 9, 60);
			this.ctx.restore();
			
							
		} else {
			var filters = this.el[0].filters;
			var rad = this.rotation * Math.PI / 180;
		    var costheta = Math.cos(rad);
		    var sintheta = Math.sin(rad);
		
		    filters.item(0).M11 = costheta;
		    filters.item(0).M12 = -sintheta;
		    filters.item(0).M21 = sintheta;
		    filters.item(0).M22 = costheta;
		}		
	},
	/**
	 * Reloads the cannon, creating new shot
	 * @alias Cannon.prototype.reload
	 */
	reload : function(){
		this.shot = this.shotFactory.create({
			left: 224, top: 289,
			events: {
				remove: this.reload.bind(this)
			}	
		});
	},
	/**
	 * Shoots the browser
	 * @alias Cannon.prototype.shoot
	 */
	shoot : function(){
		if (!this.shot){
			return;
		}
		
		this.shot.setSpeed(17, 90 - this.rotation);
		this.shot = false;
	}
};

/**
 * It's a hack. If we would use ClassName = vClass(ClassName)
 * Aptana would think that it is overwritten and the code
 * completion wouldn't work 
 */
window['Cannon'] = vClass(Cannon);

// close closure and execute it
})();
