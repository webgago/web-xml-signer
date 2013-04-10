xmlSignature.controller('SignWithUSBTokenController', ['$scope', function($scope) {

  $scope.xml = '';
  $scope.pin = '';

  $scope.sign = function() {

    var $form = $('#sign-with-usb-token-form');
    var $pin_input = $form.find('input[name=pin]');

    $.post("/prepare_signed_info", { xml: $scope.xml }, function(signed_info_xml) {

      console.log('signed_info: ' + signed_info_xml);

      var signature_value = csuser.sign_data($scope.pin, signed_info_xml);
      if (csuser.error()) {
        $pin_input.addBootstrapError(csuser.error_message);
      } else {
        var x509_certificate = csuser.get_x509_certificate($scope.pin);
        if(csuser.error()) {
          $pin_input.addBootstrapError(csuser.error_message);
        } else {
          $pin_input.removeBootstrapError();

          console.log('signature_value: ' + signature_value);
          console.log('x509_certificate: ' + x509_certificate);

          $.post("/insert_signature_and_certificate", {
            xml: $scope.xml,
            signature_value: signature_value,
            x509_certificate: x509_certificate
          }, function(signed_xml) {
            $scope.$apply(function() {
              $scope.xml = signed_xml;
            });
          });

        }
      }
    });


  };

}]);
