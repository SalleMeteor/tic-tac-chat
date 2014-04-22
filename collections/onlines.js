Onlines = new Meteor.SmartCollection('onlines');

Onlines.INTERVAL = 20000;

Onlines.opponentsOf = function (user) {
  return this.find({user: {$ne: user}, playing: false});
};

Onlines.userlist = function() {
	var onlines = this.find({}, {_id: 0, user: 1}).fetch();
	return _.pluck(onlines, 'user');
};

Onlines.enter = function(user) {
	this.insert({user: user, playing: false, keepalive: new Date().getTime()});
};

Onlines.startGame = function(user, enemy) {
	this.update({user: user}, {$set: {playing: true}});
	this.update({user: enemy}, {$set: {playing: true}});
};

Onlines.gameOver = function(user) {
	this.update({user: user}, {$set: {playing: false}});
};

Onlines.keepalive = function(user) {
	console.log('Keepalive users checking...');
	this.update({user: user}, {$set: {keepalive: new Date().getTime()}});
};

Onlines.clearAll = function() {
	console.log('Clear users offline');
	this.remove({keepalive: {$lt: (new Date().getTime() - this.INTERVAL)}});
};