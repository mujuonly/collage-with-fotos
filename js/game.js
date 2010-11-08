/** 
* JavaScript Game
*
* @author Andrew Valums valums.com
* @version 0.1
*/
// all files have closure for hiding private members,
// because of that we don't intend it
(function(){

window.Game = {
	init : function(){
		$('.container > div').hide();		
		$('.gameView').show();
		
		$('.info .restart').click(function(){
			window.location.reload();
		});		
		
		var scene = new Scene({
			el:$('.field')
		});
		var scores = new Scores($('.field .score'), $('.info .score .value'));
			
		var tiles = new Tiles(scene, scores);		
		var enemyFactory = new TileFactory('Enemy', scene, tiles);		
		var tileFlow = new TileFlow(scene, tiles, enemyFactory);	
		scene.register(tileFlow);
			
		var tileActions = new TileActions(tiles, enemyFactory);		
		
		var shotFactory = new TileFactory('Shot', scene, tiles, tileActions);				
		var cannon = new Cannon(scene, shotFactory);
		scene.register(cannon);		
	}	
};

/**
 * It's a hack. If we would use ClassName = vClass(ClassName)
 * Aptana would think that it is overwritten and the code
 * completion wouldn't work 
 */
window['Game'] = vClass(Game);

// close closure and execute it
})();