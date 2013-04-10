xmlSignature.controller('SignWithUSBTokenController', ['$scope', function($scope) {

  $scope.xml = '';
  $scope.pin = '';

  $scope.sign = function() {

    var $form = $('#sign-with-usb-token-form');
    var $pin_input = $form.find('input[name=pin]');

    var signature_value = csuser.sign_data($scope.pin, $scope.xml);

    if (csuser.error()) {
      $pin_input.addBootstrapError(csuser.error_message);
    } else {
      var x509_certificate = csuser.get_x509_certificate($scope.pin);
      if(csuser.error()) {
        $pin_input.addBootstrapError(csuser.error_message);
      } else {
        $pin_input.removeBootstrapError();
        console.log(signature_value);
        console.log(x509_certificate);
      }
    }

  };

}]);
