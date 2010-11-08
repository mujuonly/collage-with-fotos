(function(){

window.Scores = {
	/**
	 * Displays scores
	 * @param {Element} inFieldEl used to show score in the field
	 * @alias Scores
	 */	
	init : function(inFieldEl, infoEl){
		// ALL ATTRIBUTES ARE PRIVATE
		/**
		 * Total score
		 */
		var score = 0;
		/**
		 * Cleaned in last moment
		 */
		var combo = 0;		
		/**
		 * Position at which we will display score
		 */
		var position = {left:0, top:0};
		/**
		 * Timeout that will call hide 
		 */
		var hideTimeout = false;
		
		/**
		 * Adds score to the total and updates it in info
		 */
		function add(val){
			score += val;
			infoEl.text(score);
		}
		
		/**
		 * Hides score that is displayed inline
		 */
		function hide(){
			inFieldEl[0].style.display = 'none';
		}
										
		/**
		 * Function shows score in the field
		 */
		function endCombo(){
			if (hideTimeout){
				clearTimeout(hideTimeout);
			}
			
			var comboScore = Math.round(0.1*combo*combo + combo);
			
			inFieldEl.css({
				'left' : Math.round(position.left + 5) + 'px',
				'top' : Math.round(position.top + 5) + 'px',
				'display' : 'block'
			}).text('+' + comboScore);

			add(comboScore);
			combo = 0;
			
			hideTimeout = setTimeout(hide, 500);			
		}
				
		/**
		 * Whenever tile is destroyed this function is called
		 * @alias Score.prototype.add
		 */
		this.tileDestroyed = function(pos){
			if (combo == 0){				
				setTimeout(endCombo, 1);
			}						

			position = {
				left: (position.left * combo + pos.left) / (combo + 1),
				top: (position.top * combo + pos.top) / (combo + 1)
			};
			
			combo++;			
		};
		
		/**
		 * Gets total score
		 * @alias Score.prototype.get
		 */
		this.get = function(){
			return score;
		}		
	}
};

/**
 * It's a hack. If we would use ClassName = vClass(ClassName)
 * Aptana would think that it is overwritten and the code
 * completion wouldn't work 
 */
window['Scores'] = vClass(Scores);

// close closure and execute it
})();