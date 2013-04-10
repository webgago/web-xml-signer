xmlSignature.controller('SignWithUSBTokenController', ['$scope', function($scope) {
  $scope.xml = '';
  $scope.pin = '';
  $scope.sign = function() {
    console.log($scope.xml);
    console.log($scope.pin);
  };
}]);
