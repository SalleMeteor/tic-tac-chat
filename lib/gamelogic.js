/**
 * Game logic
 */

GameLogic = {};

(function (scope) {

	scope['X'] = 'icon-x';
	scope['O'] = 'icon-o';
	scope['D'] = 'draw';

	/**
	 * coordinates as strings
	 * x:1,y:2 = '12'
	 * in the game logics, we just use the key of each element
	 * '13' => 2
	 */
	var _places = ['11','12','13','21','22','23','31','32','33'];

	/**
	 * one number in a winner sequence correspond to one key in _places
	 */
	var _winner_sequences = [
		//rows
		[0,1,2],[3,4,5],[6,7,8],
		//cols
		[0,3,6],[1,4,7],[2,5,8],
		//crossed
		[0,4,8],[2,4,6]
	];

	/**
	 * one room is represented by {'room1' => {x:[],o[]}}
	 * where the 'x' and 'o' arrays hold key that have a coordinate 
	 */
	var _rooms = {};

	/**
	 * check for wrong shots
	 */
	function isValidShot(room,shot) {
		//check if room exists
		if(!_rooms[room]) 
			return false;
		
		//is in the correct interval
		if(shot < 0 || shot >= _places.length) return false;
		
		//is duplicated shot
		if(_rooms[room].x.indexOf(shot) !== -1) return false;
		if(_rooms[room].o.indexOf(shot) !== -1) return false;

		return true;
	}

	/**
	 * check if all itens in arr1 are inside arr2
	 */
	function sequenceMatch(arr1, arr2) {
		for(var i = 0; i < arr1.length; i++) {
			if(arr2.indexOf(arr1[i]) === -1)
				return false;
		}
		return true;
	}

	/**
	 * add a room for a new game
	 */
	scope.roomAdd = function (room) {
		if(_rooms[room]) 
			return false;
		_rooms[room] = {x: [], o: []};
		return true;
	}

	/**
	 * delete the game
	 */
	scope.roomDelete = function (room) {
		if(!_rooms[room]) 
			return false;
		delete _rooms[room];
		return true;
	}

	/**
	 * manage shots in the tictactoe board
	 */
	scope.roomShot = function (room, weapon, row, col) {
		if(typeof row !== 'number' || typeof col !== 'number')
			return false;

		var shot = _places.indexOf(row.toString() + col.toString());
		if(!isValidShot(room,shot))
			return false;

		if(weapon === this.X)
			_rooms[room].x.push(shot);

		if(weapon === this.O)
			_rooms[room].o.push(shot);

		return true;
	}

	/**
	 * check if game is over and return the game status
	 */
	scope.isGameOver = function (room) {
		for(var i = 0; i < _winner_sequences.length; i++) {
			if( sequenceMatch( _winner_sequences[i], _rooms[room].x) )
				return this.X;
			if( sequenceMatch( _winner_sequences[i], _rooms[room].o) )
				return this.O;
		}
		
		if(_rooms[room].x.length + _rooms[room].o.length >= 9)
			return this.D;

		return null;
	}

})(GameLogic);