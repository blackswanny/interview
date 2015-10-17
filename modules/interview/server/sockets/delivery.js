'use strict';
var dl = require('delivery'),
    fs = require('fs');

module.exports = function (io, socket) {
  var delivery = dl.listen(socket);
  
  delivery.on('receive.success', function(file) {
    console.log('receive.success', file.name);

    socket.emit('file.upload.receive', file);
    socket.broadcast.emit('file.upload.receive', file);
  });
};
