// all files have closure for hiding private members,
// because of that we don't intend it
(function(){

window.Tiles = {
	/**
	 * Tile manager
	 * @param {Scene} scene
	 * @param {Scores} scores
	 * @alias Tiles
	 */
	init : function(scene, scores, tileFactory){
		// ALL ATTRIBUTES ARE PRIVATE
		this.scene = scene;
		this.scores = scores;
		/**
		 * Tile array sorted by position
		 * can contain Sprite, or empty spot 
		 */
		this.tileGrid = Array();
		/**
		 * If we intend odd rows or even
		 */
		this.intendOdd = true;
		/**
 		* In pixels
 		*/
		this.tileSize = 32;
		/**
		 *  Number of tiles per row
		 */		
		this.tilesPerRow = Math.floor((scene.getSize().width - this.tileSize / 2 ) / this.tileSize);
	},
	/**
	 * Returns array of empty tiles that
	 * are connected to the top 
	 * @alias Tiles.prototype.getValidForNew
	 */		
	getValidForNew : function(){
		var valid = Array(),
			i = this.tileGrid.length + this.tilesPerRow;
						
		while (i--){
			// all tiles connected to ceiling are valid
			if ( ! this.tileGrid[i] &&
					(i < this.tilesPerRow || this.getAdjacentFull(i).length)){
				valid.push(i);
			}
		}
		
		return valid;
	},
	/**
	 * @alias Tiles.prototype.getSize
	 */	
	getSize : function(){
		return this.tileSize;
	},
	/**
	 * @alias Tiles.prototype.getTilesPerRow
	 */
	getTilesPerRow : function(){
		return this.tilesPerRow;
	},
	/**
	 * Sets tile at the specified index
	 * @alias Tiles.prototype.set
	 */
	set : function(i, obj){
		if (this.tileGrid[i]){
			throw 'Tile was alredy set at index ' + i;
		}
		
		this.tileGrid[i] = obj;
	},
	/**
	 * Returns array of tiles or tile at specified index.
	 * @param {Number} [i] optional tile index
	 * @alias Tiles.prototype.get
	 */
	get : function(i){
		if (i != null){
			return this.tileGrid[i];
		}
		
		return this.tileGrid;
	},
	/**
	 * Removes sprite by its index
	 * @param {Number} i 
	 * @param {Boolean} drop Drop or explode 
	 */
	remove : function(i, drop){
		var tile = this.tileGrid[i];
		this.tileGrid[i] = false;
		
		this.scores.tileDestroyed(this.toPosition(i));
		
		if (! drop){
			// Stop displaying sprite
			this.scene.remove(tile);
		} else {
			tile.setSpeed(5, 270 - 15 + Math.random() * 30);			
		}		
	},
	/**
	 * Gets array of indexes of nearby full tiles.
	 * @param {Number} index
	 * @alias Tiles.prototype.getAdjacentFull
	 */
	getAdjacentFull: function(index){
		// Adjacent indexes
		var adj = this.getAdjacent(index);

		// Now we will see if the tiles at these indexes exist		
		var exist = [], i = adj.length;
		
		while (i--){
			if (this.tileGrid[adj[i]]) exist.push(adj[i]);
		}
		return exist;
	},	
	/**
	 * Gets array of near indices. Only looks at indices.
	 * @param {Number} index
	 * @alias Tiles.prototype.getAdjacent
	 */
	getAdjacent: function(index){
		// Adjacent indexes
		var adj = [];
		// Offset from the left		
		var left = index % this.tilesPerRow;
		// Row is odd or even
		var odd = ! Math.floor(index / this.tilesPerRow % 2);		
		
		if (left > 0 ) adj.push(index-1);
		if (left + 1 < this.tilesPerRow ) adj.push(index+1);

		adj.push(index - this.tilesPerRow);			
		adj.push(index + this.tilesPerRow);
		
		if (odd && left > 0 ){
			adj.push(index - this.tilesPerRow - 1);
			adj.push(index + this.tilesPerRow - 1);			
		} else if ( ! odd && left + 1 < this.tilesPerRow){
			adj.push(index + this.tilesPerRow + 1);
			adj.push(index - this.tilesPerRow + 1);
		}
		
		return adj;
	},
	/**
	 * Converts position to nearest index in tiles array
	 * @param {Object} p Contains left,top. 
	 * @alias Tiles.prototype.toIndex
	 */
	toIndex : function(p){		
		var i = Math.floor(p.left / this.tileSize);
		i += Math.floor(p.top / this.tileSize) * this.tilesPerRow;
		return i;
	}, 
	/**
	 * Converts index in the tiles array to position
	 * @alias Tiles.prototype.toPosition 
	 */
	toPosition : function(i){
		var intendation = 0;

		var isOdd = Math.floor(i / this.tilesPerRow % 2);
		if ((isOdd && this.intendOdd) || (!isOdd && !this.intendOdd)){
			var intendation = this.tileSize / 2;
		}
		
		var left = Math.floor(i % this.tilesPerRow * this.tileSize) + intendation;
		var top = Math.floor(i / this.tilesPerRow) * this.tileSize;
		return {left:left,top:top};
	}
}	

/**
 * It's a hack. If we would use ClassName = vClass(ClassName)
 * Aptana would think that it is overwritten and the code
 * completion wouldn't work 
 */
window['Tiles'] = vClass(Tiles);

// close closure and execute it
})();