'use strict';

// Create the chat configuration
module.exports = function (io, socket) {

  socket.on('paintBeginMessage', function (message) {
    message.username = socket.request.user.username;
    socket.broadcast.emit('paintBeginMessage', message);
  });

  socket.on('paintMoveMessage', function (message) {
    message.username = socket.request.user.username;
    socket.broadcast.emit('paintMoveMessage', message);
  });

  socket.on('paintEndMessage', function (message) {
    message.username = socket.request.user.username;
    socket.broadcast.emit('paintEndMessage', message);
  });

  socket.on('paintClearMessage', function (message) {
    message.username = socket.request.user.username;
    socket.broadcast.emit('paintClearMessage', message);
  });

};
