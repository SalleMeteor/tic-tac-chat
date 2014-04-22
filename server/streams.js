GameStream = new Meteor.Stream('game');

GameStream.permissions.write(function() { return true; });
GameStream.permissions.read(function() { return true; });

GameStream.on('enter', function(user) {
	Users.login(user);
	Onlines.enter(user);
});

GameStream.on('start', function(user, enemy, room, weapon) {
	GameLogic.roomAdd(room);
	Onlines.startGame(user, enemy);
	GameStream.emit('play', room, weapon);
});

GameStream.on('invite', function(enemy, user, room) {
	GameStream.emit('request', enemy, user, room);
});

GameStream.on('shoot', function(room, weapon, row, col) {
	GameLogic.roomShot(room, weapon, row, col);
	var status = GameLogic.isGameOver(room);
	GameStream.emit('refresh', room, weapon, row, col, status);
});

GameStream.on('gameover', function(msg, user, enemy, room) {
	GameLogic.roomDelete(room);
	Onlines.gameOver(user, enemy);
	GameStream.emit('end', msg, room);
});

GameStream.on('cancel', function(msg, room) {
	GameLogic.roomDelete(room);
	GameStream.emit('end', msg, room);
});

GameStream.on('keepalive', function(user) {
	Onlines.keepalive(user);
});

GameStream.on('winner', function (user) {
	Users.wins(user);
});

GameStream.on('loser', function (user) {
	Users.loses(user);
});

GameStream.on('draw', function (user) {
	Users.draws(user);
});