angular.module('interview').directive('fileUpload', function(Socket) {
  return {
    templateUrl: 'modules/interview/views/file-upload.html',
    controller: function($scope) {
      if (!Socket.socket) {
        Socket.connect();
      }

      var delivery = new Delivery(Socket);

      delivery.on('delivery.connect', delivery => {
       $('.submit-file').click(evt => {
         delivery.send($('.input-file')[0].files[0]);
         evt.preventDefault();
       });
      });

      delivery.on('send.success', uid => {
        console.debug('send.success', uid);
      });

      $scope.files = [];
      Socket.on('file.upload.receive', file => {
        console.debug('file.upload.receive', file);

        $scope.files.push(file);
      });
    }
  };
});
