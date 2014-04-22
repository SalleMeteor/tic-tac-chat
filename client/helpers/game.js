Template.game.helpers({
  isPlaying: function() {
    return Session.get('playing');
  }
});

var playAction = function(event) {
  if(Session.get('play')) {
    var room = Session.get('room');
    var weapon = Session.get('weapon');
    var col = $(event.target).data('col');
    var row = $(event.target).closest('.row').data('row');
    Session.set('play', false);
    GameStream.emit('shoot', room, weapon, row, col);
  } else {
    alert("Please, wait your time.");
  }
  event.preventDefault();
}

Template.game.events({
  "click .col": playAction,
  "touchstart .col": playAction
});