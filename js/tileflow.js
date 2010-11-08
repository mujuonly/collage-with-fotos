// all files have closure for hiding private members,
// because of that we don't intend it
(function(){

window.TileFlow = {
	/**
	 * Creates tiles and moves them
	 * @param {Scene} scene
	 * @param {Tiles} tiles
	 * @param {TileFactory} tileFactory
	 * @alias TileFlow
	 */	
	init : function(scene, tiles, tileFactory){
		// ALL ATTRIBUTES ARE PRIVATE
		this.scene = scene;
		this.tiles = tiles;
		this.tileFactory = tileFactory;
		/**
		 * Number of updates so far
		 */
		this.updates = 0;
		/**
		 * How many enemies are created per update
		 */		
		this.speed = 0.02;
		/**
		 * How fast the difficulty is increasing
		 */		
		this.speedInc = 0.000001;
	},
	update: function(){
		this.updates++;
				
		this.speed += this.speedInc;
		
		if (Math.random() < this.speed){
			this.addEnemy();
		}
	},
	draw: function(){},
	/**
	 * Creates 1 browser (enemy) for shooting
	 * @alias TileFlow.prototype.addEnemy
	 */
	addEnemy: function(){
		var index,
			perRow = this.tiles.getTilesPerRow() 
			validPlaces = this.tiles.getValidForNew();
		
		if (Math.random() < 0.2){
			// increase the chance that the new will appear
			// at the bottom, to make them look like trees
			index = validPlaces[Math.floor(Math.random() * perRow)];
		} else {
			index = validPlaces[Math.floor(Math.random() * validPlaces.length)];
		}
		
		var type,
			adjacent = this.tiles.getAdjacentFull(index);
		
		if (Math.random() < 0.5 && adjacent.length){
			//increase a chance that the enemy
			// will be of the same type as adjacent
			type = this.tiles.get(adjacent[0]).getType();
		} else {
			// just get random type
			type = this.tileFactory.getRandomType();
		}		
		
		this.tileFactory.createAt(index, type);		
	}
};

/**
 * It's a hack. If we would use ClassName = vClass(ClassName)
 * Aptana would think that it is overwritten and the code
 * completion wouldn't work 
 */
window['TileFlow'] = vClass(TileFlow);

// close closure and execute it
})();