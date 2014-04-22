GameStream = new Meteor.Stream('game');

Meteor.startup(function() {
  Session.set('main_menu', true);
  $('.input').focus();
});

Deps.autorun(function () {
  Meteor.subscribe('users');
  Meteor.subscribe('onlines');
  Meteor.subscribe('roomMessages', Session.get("room"));
  Meteor.subscribe('allRooms');
  Meteor.subscribe('roomUsers', Session.get("room"));
});

Meteor.setInterval(function() {
	if(Session.get('user')) {
		GameStream.emit('keepalive', Session.get('user'));
	}
}, 5000);