Meteor.startup(function() {
	console.log('Meteor TicTacToe Running...');
	Onlines.remove({});
});

Meteor.setInterval(function() {
	Onlines.clearAll();
}, Onlines.INTERVAL);
