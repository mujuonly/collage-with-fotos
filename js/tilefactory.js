(function(){

window.TileFactory = {
	/**
	 * Is responsible for creating Shots and Enemies
	 * @param {String} type Shot or Enemy
	 * @param {Scene} scene
	 * @param {Tiles} tiles Tile storage
	 * @param {TileActions} tileActions
	 * @alias TileFactory
	 */	
	init : function(type, scene, tiles, tileActions){
		// ALL ATTRIBUTES ARE PRIVATE
		this.type = type;
		this.scene = scene;
		this.tiles = tiles;
		this.tileActions = tileActions;

		this.tileTypes = [
			'chrome',
			'ff',
			'ie',			
			'safari'
			/*'opera',
			'netscape'*/
		];
		
		/**
		 * If tile is created at index that
		 * is bigger than this the game is lost
		 */
		this.maxIndex = 111;				
	},
	/**
	 * Creates Sprite using index in the tiles array
	 * @alias TileFactory.prototype.createAt
	 */	
	createAt : function(i, type){
		if ( ! i ){
			return;
		}		
		
		if (i > this.maxIndex){
			this.scene.stop();
		}
					
		var position = this.tiles.toPosition(i);

		var options = {
			left: position.left,
			top: position.top
		};
		
		if (type){
			options.type = type;
		}
		
		var tile = this.create(options);
		
		this.tiles.set(i, tile);
		return tile;
	},		
	/**
	 * Creates a shot or an enemy.
	 * Use options to overwite defaults.
	 * @alias TileFactory.prototype.create
	 */		
	create : function(options){
		var type = this.type;
		var tileSize = this.tiles.getSize();
		var sceneSize = this.scene.getSize();
		
		var defaults = {
			left: 0, top: 0,
			ellipse: true,
			width: tileSize, height: tileSize,
			type: this.getRandomType(),
			parent: this.scene.getEl(),
			bounds : {
				right: sceneSize.width,
				bottom: sceneSize.height
			}			
		};
		
		for (var prop in options){
			defaults[prop] = options[prop];
		}
		
		if (type == 'Shot'){
			var sprite = new window[type](defaults, this.scene, this.tileActions);
		} else if ( type == 'Enemy'){
			var sprite = new window[type](defaults, this.scene);			
		} else {
			throw 'TileFactory can only create Shots or Enemies';
		}
		
		this.scene.register(sprite);
		return sprite;
	},
	/**
	 * Returns string with tile type
	 * @alias TileFactory.prototype.getRandomType
	 */
	getRandomType : function(){
		return this.tileTypes[Math.floor(Math.random() * this.tileTypes.length)];
	}
};

/**
 * It's a hack. If we would use ClassName = vClass(ClassName)
 * Aptana would think that it is overwritten and the code
 * completion wouldn't work 
 */
window['TileFactory'] = vClass(TileFactory);

// close closure and execute it
})();