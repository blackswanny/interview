'use strict';

// Create the chat configuration
module.exports = function (io, socket) {

  socket.on('codeMessage', function (message) {
    message.username = socket.request.user.username;
    socket.broadcast.emit('codeMessage', message);
  });

  socket.on('tabSelectedMessage', function (message) {
    message.username = socket.request.user.username;
    socket.broadcast.emit('tabSelectedMessage', message);
  });

};
