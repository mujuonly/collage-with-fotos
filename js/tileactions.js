(function(){

window.TileActions = {
	/**
	 * Is responsible for interacting with shot
	 * @param {Tiles} tiles Tile manager
	 * @alias TileActions
	 */	
	init : function(tiles, tileFactory){
		// ALL ATTRIBUTES ARE PRIVATE
		this.tiles = tiles;
		this.tileFactory = tileFactory;
	},
	/**
	 * Checks if shot is colliding with enemies
	 * @alias TileActions.prototype.isColliding 
	 */ 	
	isColliding : function(shot){
		var tiles = this.tiles.get();
		
		var i = tiles.length;
		while (i--){
			var tile = tiles[i];
			
			if (tile && shot.collide(tile)){
				return true;
			}
		}
		
		return false;	
	},
	/**
	 * Moves shot to a nearest tile and blows it if necessary
	 * @param {Sprite} shot
	 * @alias TilesActions.prototype.hitShot
	 */
	hitShot : function(shot){
		var position = shot.getPosition();		
		var target = this.getNearestEmpty(position);
				
		var created = this.tileFactory.createAt(target, shot.getType());
		
		var adjacent = this.tiles.getAdjacentFull(target);
		var i = adjacent.length;
		while (i--){
			var index = adjacent[i];

			if (shot.getType() == this.tiles.get(index).getType()){
				this.blow(created);
				this.dropFlying();
				break;
			}				
		}			
	},
	/**
	 * Returns nearest empty tile for specified position
	 * @private
	 */
	getNearestEmpty : function(position){
		var index = this.tiles.toIndex(position);
		var adjacent = this.tiles.getAdjacent(index);
		
		// we look which one of 9 tiles is the nearest
		adjacent.push(index);
		
		var minDistance = 10000000, nearest;
						
		var j = adjacent.length;				
		while (j--){
			var index = adjacent[j];
			
			if (this.tiles.get(index)){
				// tile is not empty
				continue;
			}
				
			var pos = this.tiles.toPosition(index);
			distance = Math.abs(position.top - pos.top) + Math.abs(pos.left - position.left);
			
			if (distance < minDistance){
				minDistance = distance;
				nearest = adjacent[j];
			}	
		}		

		return nearest;
	},
	/**
	 * Removes tiles that are not connected to others or to ceiling.
	 * @private
	 */
	dropFlying: function(){
		/**
		 * xoo xxx xxx
		 * o   o   x
		 * o o o o o o
		 * ooo ooo ooo
		 * 
		 * We start at the ceiling at then moving to adjacent
		 * finding all tiles that we can reach
		 */
		
		// array of indices which should be checked
		var toCheck = Array();
		
		// if tile at this index is connected contains true
		var connected = Array();
		
		var i = this.tiles.getTilesPerRow();
		
		while (i--){
			// if tile near ceiling exists
			if (this.tiles.get(i)){
				toCheck.push(i);
				connected[i] = true;
			}
		}
		
		while (toCheck.length){
			var c = toCheck.pop();			
			var adj = this.tiles.getAdjacentFull(c);
			
			var i = adj.length;			
			while (i--){
				if (connected[adj[i]]){
					continue;
				}
									
				toCheck.push(adj[i]);
				connected[adj[i]] = true;
			}
		}
		
		var tiles = this.tiles.get();
		
		var i = tiles.length;
		while (i--){
			if (tiles[i] && ! connected[i]){
				this.tiles.remove(i, true);
			}
		}		
		
	},
	/**
	 * Removes adjacent tiles the same type and this tile.
	 * @param {Sprite} sprite
	 * @private
	 */
	blow : function(sprite){
		var index = this.tiles.toIndex(sprite.getPosition());
		
		if ( ! this.tiles.get(index)){
			throw "Can't blow inexistent sprite at " . index; 
		}
		
		// Tiles which will be blown with neighbours
		// of the same type
		var toCheck = Array();
		var added = Array();
		
		toCheck.push(sprite);
		added[index] = true;		
		
		while (toCheck.length){
			// current sprite
			var cSprite = toCheck.pop();
			var cIndex = this.tiles.toIndex(cSprite.getPosition());
			
			this.tiles.remove(cIndex);	
			
			// get indexes of adjacent tiles		
			var adjacent = this.tiles.getAdjacentFull(cIndex);
			
			var j = adjacent.length;			
			while (j--){
				var adjIndex = adjacent[j];
				
				if (added[adjIndex]){
					// do not add again
					continue;
				}
				 
				var adjSprite = this.tiles.get(adjIndex);				
				if (adjSprite.getType() != sprite.getType()){
					continue;
				}			
					
				toCheck.push(adjSprite);
				added[adjIndex] = true;
			}
		}
	}
};

/**
 * It's a hack. If we would use ClassName = vClass(ClassName)
 * Aptana would think that it is overwritten and the code
 * completion wouldn't work 
 */
window['TileActions'] = vClass(TileActions);

// close closure and execute it
})();