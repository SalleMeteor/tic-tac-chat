
Template.room.helpers({

    username    : function() {
        return Session.get('user');
    }, 
    roomusers   : function() {
       return RoomUsers.find({ room : Session.get('room') }, { sort : { user : 'asc' }});
    },
    isPlaying: function() {
      return Session.get('playing');
    },
    messages: function() {
      return Messages.find({ room : Session.get('room') }, {sort : {creation_date : 'desc'}});
    }
});

Template.room.rendered = function() {

    
}

Template.room.events = {

    'click .send-message' : function(e, tmpl) {

        e.preventDefault();

        if( $('.message').val() === '' ) {
            
            return false;
        
        }

        message = {
            user            : Session.get('user'),
            room            : Session.get('room'), 
            content         : $('.message').val(),
            creation_date   : new Date()
        };

        message._id = Messages.insert(message);

        $('.message').val('');

    },

    'keyup .message' : function(e, tmpl) {

        if( e.keyCode === 13 ) {

            message = {
                user            : Session.get('user'),
                room            : Session.get('room'), 
                content         : $('.message').val(),
                creation_date   : new Date()
            };

            message._id = Messages.insert(message);

            $('.message').val('');

        }

    } 
}