angular.module('pbUi.machineConfigCtrl', [])
  .controller('machineConfigCtrl', ['$scope', function($scope) {

    $scope.isCalibrating = false;
    $scope.currentMachineConfig;

    function _keyListener (e) {
      console.log(e);
    }

    $scope.toggleCalibration = function () {
      $scope.isCalibrating = !$scope.isCalibrating;
    };

  }]);
