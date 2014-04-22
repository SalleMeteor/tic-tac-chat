Users = new Meteor.SmartCollection('users');

Users.info = function (user) {
  return this.findOne({user: user});
};

Users.login = function(user) {
	var current_user = this.findOne({user: user});
	if(!current_user) {
		this.insert({user: user, plays: 0, wins: 0, loses: 0, draws: 0});
	}
};

Users.wins = function (user) {
  this.update({user: user}, {$inc: {plays: 1, wins: 1}});
};

Users.draws = function (user) {
  this.update({user: user}, {$inc: {plays: 1, draws: 1}});
};

Users.loses = function (user) {
  this.update({user: user}, {$inc: {plays: 1, loses: 1}});
};