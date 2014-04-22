Template.opponents.helpers({
  currentUser: function() {
    return Users.info(Session.get('user'));
  },
  onlines: function() {
    return Onlines.opponentsOf(Session.get('user'));
  },
  hasRoom: function() {
    return Session.get('room');
  },
  isPlaying: function() {
    return Session.get('playing');
  },
  showMainMenu: function() {
    return Session.equals('main_menu', true);
  }
});

Template.opponents.events({
  "submit .form": function(event, template) {
    var user = $(event.target).find('.input').val();
    if(user && user.match(/^[0-9a-zA-Z_]{4,10}$/)) {
      user = user.substr(0, 10);
      Session.set('user', user);
      Session.set('weapon', GameLogic.X);
      GameStream.emit('enter', user);
    } else {
      alert('Invalid name.\nThe name must contains at least 4 chars.\nOnly letters, numbers and underscore are accepted.');
      template.find('.input').focus();
    }
    event.preventDefault();
  },
  "click .play": function(event, template) {
    var user = Session.get('user');
    if(user) {
      var enemy = $(event.target).data('enemy');
      var room = Random.id();
      Session.set('room', room);
      Session.set('playing', true);
      $('.gameboard').html(Meteor.render(Template.game));
      GameStream.emit('invite', enemy, user, room);
    } else {
      alert('Type your name first.');
      template.find('.input').focus();
    }
    event.preventDefault();
  }
});