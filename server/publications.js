Meteor.publish('users', function(user) {
	return Users.find();
});
Meteor.publish('onlines', function(user) {
	return Onlines.find();
});
